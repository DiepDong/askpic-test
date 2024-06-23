import React, { useState, useCallback } from "react";
import { Flex, Group, Text, rem, Image, Button, ScrollArea, Highlight, Modal } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './cropUtils'; // Make sure this path is correct
import { uploadFile } from "../../api/upload";
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';

export default function Uploadcv(props) {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const handleDrop = (files) => {
    setAcceptedFiles(files);
    setQuestionsAndAnswers([]);
    console.log("accepted files", files);
    setCropImageSrc(URL.createObjectURL(files[0]));
    setIsCropping(true);
  };

  const handleReject = () => {
    setAcceptedFiles([]);
    setQuestionsAndAnswers([]);
    console.log("rejected files");
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleGenerateQuestions = async () => {
    if (acceptedFiles.length === 0) {
      console.log("No file to upload.");
      return;
    }

    setLoading(true);

    const file = acceptedFiles[0];

    const id = notifications.show({
      loading: true,
      title: 'Generating Answers from Questions',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const croppedImageBlob = await getCroppedImg(cropImageSrc, croppedAreaPixels);
      const croppedFile = new File([croppedImageBlob], file.name, { type: file.type });

      const response = await uploadFile(croppedFile);
      console.log("API Response:", response);

      if (response && response.data && response.data.length > 0) {
        setQuestionsAndAnswers(response.data);

        notifications.update({
          id,
          color: 'teal',
          title: 'Success',
          message: 'Answers have been generated successfully!',
          icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
          loading: false,
          autoClose: 5000,
        });

      } else {
        console.log("No questions and answers returned from API.");
        setQuestionsAndAnswers([]);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setQuestionsAndAnswers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCrop = async () => {
    const croppedImageBlob = await getCroppedImg(cropImageSrc, croppedAreaPixels);
    const croppedFile = new File([croppedImageBlob], acceptedFiles[0].name, { type: acceptedFiles[0].type });
    setAcceptedFiles([croppedFile]);
    setIsCropping(false);
  };

  return (
    <>
      <Flex style={{ height: "100%" }}>
        <Flex direction="column" gap="sm" style={{ flex: 1, padding: "1rem 2rem", alignItems: "stretch" }}>
          <Dropzone
            onDrop={handleDrop}
            onReject={handleReject}
            maxSize={5 * 1024 ** 2}
            accept="image/png,image/jpeg"
            {...props}
          >
            <Group
              justify="center"
              gap="xl"
              mih={200}
              style={{ pointerEvents: "none", textAlign: "center" }}
            >
              {acceptedFiles.length === 0 && (
                <>
                  <Dropzone.Accept>
                    <IconUpload
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-blue-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-red-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <Flex align="center" gap="1rem" direction="column">
                      <IconPhoto
                        style={{
                          width: rem(52),
                          height: rem(52),
                          color: "var(--mantine-color-dimmed)",
                        }}
                        stroke={1.5}
                      />
                      <div>
                        <Text size="xl" inline>
                          Drag images here or click to select files
                        </Text>
                      </div>
                    </Flex>
                  </Dropzone.Idle>
                </>
              )}
              {acceptedFiles.length > 0 && (
                <Flex direction="column" align="center" gap="sm">
                  {acceptedFiles.map((file, index) => (
                    <Image
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{
                        objectFit: "cover",
                        width: "90%",
                        height: "100%",
                        borderRadius: "0.5rem",
                      }}
                    />
                  ))}
                </Flex>
              )}
            </Group>
          </Dropzone>
        </Flex>

        <Flex direction="column" gap="sm" style={{ flex: 1, padding: "1rem 2rem", maxHeight: "100%", overflowY: "auto" }}>
          <ScrollArea h="77.5vh">
            {questionsAndAnswers.length > 0 ? (
              <ul style={{ paddingInlineStart: "0", listStyleType: "none", margin: "0", padding: "0" }}>
                {questionsAndAnswers.map((qa, index) => (
                  <li key={uuidv4()} style={{ marginBottom: "1rem" }}>
                    <Text size="lg" weight={500} style={{ whiteSpace: "pre-line" }}>{qa.question}</Text>
                    <div style={{ whiteSpace: "pre-line", marginTop: "0.5rem" }}>
                      <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Answer:</span>
                      <span> </span>
                      <Highlight style={{ display: 'inline' }} highlight={qa.answer}>
                        {qa.answer}
                      </Highlight>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Text size="lg" color="dimmed">Answers will appear here after click view answer.</Text>
            )}
          </ScrollArea>
        </Flex>
      </Flex>

      <Group style={{ position: "fixed", inset: "auto 40px 40px auto", bottom: "30px", right: "40px" }}>
        <Button variant="default" size="md" radius="xl" onClick={() => setAcceptedFiles([])}>Cancel</Button>
        <Button
          variant="filled"
          size="md"
          radius="xl"
          onClick={handleGenerateQuestions}
          disabled={loading}
        >
          {loading ? "Generating..." : "View Answers"}
        </Button>
      </Group>

      <Modal opened={isCropping} onClose={() => setIsCropping(false)} title="Crop Image" size="80%">
        <div className="crop-container" style={{ position: 'relative', width: '100%', height: '60vh' }}>
          <Cropper
            image={cropImageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3} // Change this to 0 for free aspect ratio
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{ containerStyle: { backgroundColor: '#333' } }}
          />
        </div>
        <Group position="center" mt="md">
          <Button variant="default" onClick={() => setIsCropping(false)}>Cancel</Button>
          <Button variant="filled" onClick={handleCrop}>Crop</Button>
        </Group>
      </Modal>
    </>
  );
}
