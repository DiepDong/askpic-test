
import { Flex, Title, Text, Container, Box, Divider, Grid, Button, ActionIcon } from "@mantine/core";
import style from "./style.module.css";
import logo from "../../assets/logo513.png";
import darkarrow from "../../assets/dark-arrow.png";
import description1 from "../../assets/description-1.png";
import description2 from "../../assets/description-2.png";
import description3 from "../../assets/description-3.png";
import About from "../../assets/About.png";
import UpArrow from "../../assets/up-arrow.png";
import { IconArrowBigRight, IconBrandReddit, IconBrandTwitter, IconMessage, IconBrandTelegram, IconBrandGithub, IconArrowUp } from '@tabler/icons-react';
import { useEffect, useState } from "react";

const socials = [
  { icon: IconBrandReddit },
  { icon: IconBrandTwitter },
  { icon: IconMessage },
  { icon: IconBrandTelegram },
  { icon: IconBrandGithub },
];
const supportItems = ['Help Center', 'FAQ', 'Bug report', 'Contact Us'];
const names = ['Askpic', 'Forum', 'Documentation'];


export default function LandingPage() {
  const [sticky, setSticky] = useState(false);
  const [showButton, setShowButton] = useState(false); // state mới để kiểm soát việc hiển thị nút up-arrow


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setSticky(true);
        setShowButton(true); // hiển thị nút up-arrow khi cuộn xuống 500px
      } else {
        setSticky(false);
        setShowButton(false); // ẩn nút up-arrow khi ở đầu trang
      }

      // Tính vị trí của phần "About" trên màn hình
      const aboutElement = document.querySelector(`.${style.about}`);
      if (aboutElement) {
        const aboutElementPosition = aboutElement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // Nếu phần "About" xuất hiện trên màn hình
        if (aboutElementPosition < windowHeight * 0.75) {
          setShowAbout(true); // Kích hoạt hiệu ứng xuất hiện
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Xóa bỏ event listener khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => { // hàm xử lý sự kiện click vào nút up-arrow
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };



  return (
    <>
      <nav className={`${style.nav} ${sticky ? style.darknav : ""}`}>
        <Flex
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <img src={logo} alt="logo" className={style.logo} />
          <Title order={5} style={{ color: 'white' }}>Askpic</Title>
        </Flex>
        <ul>
          <li>
            <a href='dashboard' className={style.hovertext}>Home</a>
          </li>
          <li>
            <a href="about" className={style.hovertext}>About</a>
          </li>
          <li>
            <button className={`${style.btn} ${style.hover}`}>Contact us</button>
          </li>
        </ul>
      </nav>
      <div className={style.hero}>
        <div className={style.heroContent}>
          <h1>Unlock Your Academic Success</h1>
          <p>Take the Next Step Towards Excelling in Your Studies Today!</p>
          <button className={style.btn}>
            Get Started
            <img src={darkarrow} alt="arrow" />
          </button>
        </div>
      </div>

      <Flex justify='center' gap='lg' style={{ marginTop: '100px' }}>
        <img className={style.image} src={About} />
        <Flex direction="column" gap="sm">
          <Title order={1}> About </Title>
          <Title order={4}>Accelerate Homework Solutions</Title>
          <Text size="sm" className={style.text}>
            Welcome to our app designed to help students solve exercises quickly using advanced technology. By integrating Optical Character Recognition (OCR) to extract text from images and employing Language Models (LLM) to generate answers, we empower learners to streamline their study process efficiently.
          </Text>
          <Text size="sm" className={style.text}>
            Whether you're tackling math problems, analyzing literature excerpts, or decoding scientific equations, our tool provides a seamless experience to enhance your learning journey. Join us in revolutionizing the way students approach homework and assignments with cutting-edge AI-driven solutions.
          </Text>
        </Flex>
      </Flex>
      {/* Create footer for CVez */}
      <Box>
        <Divider style={{ marginBottom: '30px', marginTop: '50px' }} />
        <Container>
          <Grid>
            <Grid.Col span={4}>
              <Title style={{ marginBottom: '10px' }} order={5}>Governance</Title>
              {names.map((name, index) => (
                <a key={index} href="" className={style.hovertext}>
                  <Text style={{ marginBottom: '10px' }} size="sm">{name}</Text>
                </a>
              ))}
            </Grid.Col>
            <Grid.Col span={4}>
              <Title style={{ marginBottom: '10px' }} order={5}>Support</Title>
              {supportItems.map((item, index) => (
                <a key={index} href="" className={style.hovertext}>
                  <Text style={{ marginBottom: '10px' }} size="sm">{item}</Text>
                </a>
              ))}
            </Grid.Col>

            <Grid.Col span={4}>
              <Title style={{ marginBottom: '5px' }} order={5}>Subscribe to Askpic newsletter</Title>
              <Text size="sm" c="dimmed">Get the latest news and updates</Text>
              <Button variant="outline" color="red" size="xs" style={{ height: 40, my: 3, width: 220, marginTop: '10px' }}
                rightSection={<IconArrowBigRight style={{ marginLeft: '-5px' }} size={14} />}
              >Subscribe</Button>
              <Flex
                mih={50}
                gap="lg"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
                style={{ marginTop: "10px" }}
              >
                {socials.map((item, i) => (
                  <ActionIcon variant="transparent" color="black" key={i}>
                    <item.icon />
                  </ActionIcon>
                ))}
              </Flex>
            </Grid.Col>
          </Grid>
          <Divider style={{ marginTop: 4, marginBottom: "20px", width: '95%' }} size="xs" />
          <Flex justify="space-between" align="center" style={{ width: '95%' }}>
            <Text style={{ marginBottom: '20px' }} size="sm" c="dimmed">© 2024 Askpic. All rights reserved</Text>
            <Text style={{ marginBottom: '20px' }} size="sm" c="dimmed">Made by Askpic</Text>
          </Flex>
        </Container>
      </Box>
      {showButton && (
        <img src={UpArrow} alt="up-arrow" className={style.upArrow} onClick={scrollToTop} />
      )}
    </>
  );
}
