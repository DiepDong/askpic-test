import React, { useState, useCallback } from "react";
import {
  Flex,
  Group,
  Text,
  rem,
  Image,
  Button,
  ScrollArea,
  Highlight,
  Modal,
} from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { v4 as uuidv4 } from "uuid";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg, createImage } from "./cropUtils";
import { uploadFile } from "../../api/upload";

export default function Uploadcv(props) {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({
    aspect: 4 / 3,
    unit: "px",
    width: 200,
    height: 150,
    x: 0,
    y: 0
  });
  const [image, setImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const handleDrop = (files) => {
    setAcceptedFiles(files);
    setQuestionsAndAnswers([]);
    const imageUrl = URL.createObjectURL(files[0]);
    setCropImageSrc(imageUrl);
    setIsCropping(true);
    console.log("Image URL for cropping:", imageUrl);
  };

  const handleReject = () => {
    setAcceptedFiles([]);
    setQuestionsAndAnswers([]);
  };

  const handleGenerateQuestions = async () => {
    if (acceptedFiles.length === 0) {
      console.log("No file to upload.");
      return;
    }

    setLoading(true);

    const file = acceptedFiles[0];

    const id = notifications.show({
      loading: true,
      title: "Generating Answers from Questions",
      message: "Please wait...",
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const croppedImageBlob = await getCroppedImg(cropImageSrc, croppedAreaPixels);
      const croppedFile = new File([croppedImageBlob], file.name, {
        type: file.type,
      });

      const response = await uploadFile(croppedFile);
      console.log("API Response:", response);

      if (response && response.data && response.data.length > 0) {
        setQuestionsAndAnswers(response.data);

        notifications.update({
          id,
          color: "teal",
          title: "Success",
          message: "Answers have been generated successfully!",
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

  const handleImageLoaded = useCallback((image) => {
    console.log("Image loaded:", image);
    setImage(image);
    setCrop((prevCrop) => ({
      ...prevCrop,
      aspect: image.width / image.height,
      width: image.width * 0.5,
      height: image.height * 0.5,
      x: (image.width - (image.width * 0.5)) / 2,
      y: (image.height - (image.height * 0.5)) / 2,
    }));
  }, []);

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log("Crop complete:", croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropCancel = () => {
    setIsCropping(false);
  };

  const handleCropConfirm = async () => {
    if (!croppedAreaPixels || !image) {
      console.error("No crop area selected or image not loaded.");
      return;
    }

    const croppedImageBlob = await getCroppedImg(cropImageSrc, croppedAreaPixels);
    const croppedFile = new File([croppedImageBlob], acceptedFiles[0].name, {
      type: acceptedFiles[0].type,
    });
    setAcceptedFiles([croppedFile]);
    setIsCropping(false);
  };

  return (
    <>
      <Flex style={{ height: "100%" }}>
        <Flex
          direction="column"
          gap="sm"
          style={{ flex: 1, padding: "1rem 2rem", alignItems: "stretch" }}
        >
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
              style={{
                pointerEvents: "none",
                textAlign: "center",
              }}
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

        <Flex
          direction="column"
          gap="sm"
          style={{
            flex: 1,
            padding: "1rem 2rem",
            maxHeight: "100%",
            overflowY: "auto",
          }}
        >
          <ScrollArea h="77.5vh">
            {questionsAndAnswers.length > 0 ? (
              <ul
                style={{
                  paddingInlineStart: "0",
                  listStyleType: "none",
                  margin: "0",
                  padding: "0",
                }}
              >
                {questionsAndAnswers.map((qa, index) => (
                  <li key={uuidv4()} style={{ marginBottom: "1rem" }}>
                    <Text
                      size="lg"
                      weight={500}
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {qa.question}
                    </Text>
                    <div style={{ whiteSpace: "pre-line", marginTop: "0.5rem" }}>
                      <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
                        Answer:
                      </span>
                      <span> </span>
                      <Highlight style={{ display: "inline" }} highlight={qa.answer}>
                        {qa.answer}
                      </Highlight>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Text size="lg" color="dimmed">
                Answers will appear here after clicking "View Answers".
              </Text>
            )}
          </ScrollArea>
        </Flex>
      </Flex>

      <Group
        style={{
          position: "fixed",
          inset: "auto 40px 40px auto",
          bottom: "30px",
          right: "40px",
        }}
      >
        <Button variant="default" size="md" radius="xl" onClick={() => setAcceptedFiles([])}>
          Cancel
        </Button>
        <Button
          size="md"
          radius="xl"
          onClick={handleGenerateQuestions}
          loading={loading}
          disabled={acceptedFiles.length === 0}
        >
          View Answers
        </Button>
      </Group>
      <Modal
        opened={isCropping}
        onClose={handleCropCancel}
        title="Crop Image"
        size="lg"
        centered
      >
        {cropImageSrc && (
          <div style={{ width: "100%", height: "400px" }}>
            <ReactCrop
              src={cropImageSrc}
              crop={crop}
              onImageLoaded={handleImageLoaded}
              onChange={handleCropChange}
              onComplete={handleCropComplete}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <Group position="right" mt="md">
          <Button onClick={handleCropCancel}>Cancel</Button>
          <Button onClick={handleCropConfirm}>Confirm</Button>
        </Group>
      </Modal>;



    </>
  );
}

