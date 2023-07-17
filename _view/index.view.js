import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useState, useEffect, useRef, createRef, forwardRef } from "react";
import { observer } from "mobx-react-lite";
import { Player, ControlBar } from "video-react";
import { isAndroid, isIOS, isMobile } from "react-device-detect";
import { SectionsContainer, Section } from "react-fullpage";
import ReactFullpage from "@fullpage/react-fullpage";

const Home = observer((props) => {
    const router = useRouter();
    const [scrollStep, setScrollStep] = useState(0);
    const [cookieIs, setCookieIs] = useState(null);
    const [globe, setGlobe] = useState(false);
    const [mobileInfo, setMobileInfo] = useState(false);

    // scroll down 페이지 마다 다르게 적용
    const onHashchange = () => {
        const height = window.innerHeight;
        const transform3d = document.querySelector(".SectionContainer").style.transform;
        const transformY = parseInt(transform3d.split(",")[1].slice(0, -2));
        setScrollStep(Math.abs(transformY / height));
    };

    // 페이지 중간에 새로고침 시 페이지 위치 이상하게 적용됨
    // useEffect(() => {
    //     // 강제로 맨처음으로 새로고침되게 적용
    //     router.push("/");
    // }, [router.isReady]);

    useEffect(() => {
        setCookieIs(localStorage.getItem("cookieIs"));
        setGlobe(localStorage.getItem("lang") == "en" ? true : false);

        window.addEventListener("hashchange", onHashchange);

        return () => {
            window.removeEventListener("hashchange", onHashchange);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("lang", !globe ? "ko" : "en");
    }, [globe]);

    const downloadMobile = () => {
        if (isAndroid) {
            location.href = "https://play.google.com/store/apps/details?id=com.xxblue.dropkitchen&isExternBrowser=Y&pli=1";
        } else if (isIOS) {
            location.href = "https://apps.apple.com/app/id6443930923?isExternBrowser=Y";
        } else {
            // android
            location.href = "https://play.google.com/store/apps/details?id=com.xxblue.dropkitchen&isExternBrowser=Y&pli=1";
        }
    };

    return (
        <div className="view">
            <div className="video-bg">
                <Player autoPlay={true} loop={true} muted={true} playsInline={true} controls={false}>
                    <ControlBar disableDefaultControls={true} />
                    <source src={isMobile ? "https://asset.dropkitchen.xyz/temp/dk_1.5_mobile_750x1624.mp4" : "https://asset.dropkitchen.xyz/contents/202307_dev/20230704145907492_dk.mp4"} />
                </Player>
            </div>

            <header>
                <a href="#">
                    <img src="https://asset.dropkitchen.xyz/contents/202307_dev/logo.svg" alt="dropkichen" />
                </a>
                <button className="globe" onClick={() => setGlobe(!globe)}>
                    <span>{globe ? "KR" : "EN"}</span>
                </button>
            </header>

            <ReactFullpage
                //fullpage options
                licenseKey={"YOUR_KEY_HERE"}
                scrollingSpeed={1000} /* Options here */
                onLeave={(origin, destination, direction) => {
                    setScrollStep(destination.index);
                }}
                render={({ state, fullpageApi }) => {
                    return (
                        <ReactFullpage.Wrapper>
                            <div className="section">
                                <section className="view-sec">
                                    <div className="text-wrap title-con">
                                        <h2>
                                            {globe ? (
                                                <>
                                                    Experience
                                                    <br className="mobile" /> the Future of
                                                    <br /> Art Collecting
                                                </>
                                            ) : (
                                                <>
                                                    미래의 아트 컬렉팅을
                                                    <br />
                                                    경험해요
                                                </>
                                            )}
                                        </h2>
                                        <p>
                                            {globe ? (
                                                <>
                                                    Discover new artists and enjoy the art of
                                                    <br className="mobile" /> collecting.
                                                    <br className="pc" /> The future of art collecting
                                                    <br className="mobile" /> is here on dropkitchen™.
                                                </>
                                            ) : (
                                                <>
                                                    우리는 새로운 아티스트를 발굴하고, <br className="mobile" />
                                                    신선하고 즐거운 아트 컬렉팅 문화를 선보이죠. <br /> 드롭키친과 함께 앞으로의 아트 컬렉팅을 <br className="mobile" /> 가장 먼저 경험해 보세요.
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    <div className="download-link-wrap">
                                        <a href="https://play.google.com/store/apps/details?id=com.xxblue.dropkitchen&isExternBrowser=Y&pli=1" target="_blank" className="google-play-link pc">
                                            <span>Google Play</span>
                                        </a>
                                        <a href="https://apps.apple.com/app/id6443930923?isExternBrowser=Y" target="_blank" className="apple-link pc">
                                            <span>App Store</span>
                                        </a>
                                        <a className="download-link mobile" onClick={downloadMobile}>
                                            <span>{globe ? "Download the app" : "앱 다운로드"}</span>
                                        </a>
                                    </div>
                                </section>
                            </div>

                            <div className="section">
                                <section className="view-sec">
                                    <div className="text-wrap">
                                        <h2>
                                            {globe ? (
                                                <>
                                                    Discover and Collect
                                                    <br className="mobile" /> the Art You Love
                                                </>
                                            ) : (
                                                <>
                                                    좋아하는 아트를
                                                    <br />
                                                    발견하고 컬렉팅하세요
                                                </>
                                            )}
                                        </h2>
                                        <p>
                                            {globe ? (
                                                <>
                                                    Discover new artists, browse through works,
                                                    <br className="mobile" /> and curate your very own gallery. <br />
                                                    For a collection you can access whenever,
                                                    <br className="mobile" /> wherever, right from your pocket.
                                                </>
                                            ) : (
                                                <>
                                                    새로운 아티스트와 작품들을 발견하고, <br className="mobile" />
                                                    나만의 갤러리를 큐레이션해 보세요.
                                                    <br />
                                                    언제 어디서든 당신의 포켓 속 갤러리에 있을 거예요.
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    <div className="download-link-wrap">
                                        <a href="https://play.google.com/store/apps/details?id=com.xxblue.dropkitchen&isExternBrowser=Y&pli=1" target="_blank" className="google-play-link pc">
                                            <span>Google Play</span>
                                        </a>
                                        <a href="https://apps.apple.com/app/id6443930923?isExternBrowser=Y" target="_blank" className="apple-link pc">
                                            <span>App Store</span>
                                        </a>
                                        <a className="download-link mobile" onClick={downloadMobile}>
                                            <span>{globe ? "Download the app" : "앱 다운로드"}</span>
                                        </a>
                                    </div>
                                </section>
                            </div>

                            <div className="section">
                                <section className="view-sec">
                                    <div className="text-wrap">
                                        <h2>
                                            {globe ? (
                                                <>
                                                    Experience Art
                                                    <br className="mobile" /> in New Ways
                                                </>
                                            ) : (
                                                <>
                                                    다양한 방식으로
                                                    <br />
                                                    아트를 경험해 보세요
                                                </>
                                            )}
                                        </h2>
                                        <p>
                                            {globe ? (
                                                <>
                                                    Explore new ways to enjoy the stories behind
                                                    <br className="mobile" /> the artists and their work <br className="pc" />— including using
                                                    <br className="mobile" /> AR to take photos and videos that bring your
                                                    <br className="mobile" /> imagination to life.
                                                </>
                                            ) : (
                                                <>
                                                    색다른 콘텐츠로 작가와 작품의 스토리를 감상하고,
                                                    <br />
                                                    AR 기능으로 작가의 상상력에 내 상상을 더해
                                                    <br className="mobile" /> 사진과 동영상을 남겨 보세요.
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    <div className="download-link-wrap">
                                        <a href="https://play.google.com/store/apps/details?id=com.xxblue.dropkitchen&isExternBrowser=Y&pli=1" target="_blank" className="google-play-link pc">
                                            <span>Google Play</span>
                                        </a>
                                        <a href="https://apps.apple.com/app/id6443930923?isExternBrowser=Y" target="_blank" className="apple-link pc">
                                            <span>App Store</span>
                                        </a>
                                        <a className="download-link mobile" onClick={downloadMobile}>
                                            <span>{globe ? "Download the app" : "앱 다운로드"}</span>
                                        </a>
                                    </div>
                                </section>
                            </div>

                            <div className="section">
                                <section className="view-sec">
                                    <div className="text-wrap">
                                        <h2>
                                            {globe ? (
                                                <>
                                                    Connect with <br />
                                                    Artists, Collectors,
                                                    <br className="mobile" /> and Friends
                                                </>
                                            ) : (
                                                <>
                                                    아티스트, 컬렉터, 친구들을
                                                    <br />
                                                    커뮤니티에서 만나 보세요
                                                </>
                                            )}
                                        </h2>
                                        <p>
                                            {globe ? (
                                                <>
                                                    Chat with your favorite artists
                                                    <br className="pc" />
                                                    and discuss
                                                    <br className="mobile" /> your favorite pieces with other collectors.
                                                </>
                                            ) : (
                                                <>
                                                    채팅을 통해 아티스트와 직접 대화할 수 있고,
                                                    <br />
                                                    다양한 컬렉터들과 함께 좋아하는
                                                    <br className="mobile" /> 아트 이야기를 나눌 수 있어요.
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    <div className="download-link-wrap">
                                        <a href="https://play.google.com/store/apps/details?id=com.xxblue.dropkitchen&isExternBrowser=Y&pli=1" target="_blank" className="google-play-link pc">
                                            <span>Google Play</span>
                                        </a>
                                        <a href="https://apps.apple.com/app/id6443930923?isExternBrowser=Y" target="_blank" className="apple-link pc">
                                            <span>App Store</span>
                                        </a>
                                        <a className="download-link mobile" onClick={downloadMobile}>
                                            <span>{globe ? "Download the app" : "앱 다운로드"}</span>
                                        </a>
                                    </div>
                                </section>
                            </div>

                            <div className="section">
                                <section className="view-sec">
                                    <div className="text-wrap">
                                        <p>{globe ? "We believe, “Art is food for the soul.”" : "아트의 힘을 믿어요."}</p>
                                        <h2>{globe ? "Download Now" : "지금 다운로드하세요"}</h2>
                                    </div>

                                    <div className="download-link-wrap">
                                        <a href="https://play.google.com/store/apps/details?id=com.xxblue.dropkitchen&isExternBrowser=Y&pli=1" target="_blank" className="google-play-link pc">
                                            <span>Google Play</span>
                                        </a>
                                        <a href="https://apps.apple.com/app/id6443930923?isExternBrowser=Y" target="_blank" className="apple-link pc">
                                            <span>App Store</span>
                                        </a>
                                        <a className="download-link mobile" onClick={downloadMobile}>
                                            <span>{globe ? "Download the app" : "앱 다운로드"}</span>
                                        </a>
                                    </div>

                                    <footer>
                                        <nav>
                                            <ul>
                                                <li>
                                                    <a href="/terms">{globe ? "Terms of Use" : "이용약관"}</a>
                                                </li>
                                                <li>
                                                    <a href="/privacy">{globe ? "Privacy Policy" : "개인정보처리방침"}</a>
                                                </li>
                                            </ul>
                                        </nav>

                                        <span className="info pc">
                                            {globe ? (
                                                <>
                                                    Name of company : XXBLUE | Business registration number : 755-86-01476 | Name of representative : Lee Jung Bong | Address : 317, Dosan-daero, Gangnam-gu, Seoul, Republic of Korea | <br />
                                                    Contact : +82 25451476 | Email : info@dropkitchen.xyz | Ecommerce registration number: 2019-서울강남-03088 &nbsp;
                                                </>
                                            ) : (
                                                <>
                                                    상호명 : 엑스바이블루 | 사업자번호 : 755-86-01476 | 대표자명 : 이정봉 | 주소 : 서울 특별시 강남구 도산대로 317, 7층 (신사동, 호림아트센터1빌딩) | 연락처 : 02-545-1476 | 이메일 : info@dropkitchen.xyz
                                                    | 통신판매업신고번호 : 2019-서울강남-03088 &nbsp;
                                                </>
                                            )}
                                            <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=7558601476&apv_perm_no=">{globe ? "Check Business Info" : "사업자정보확인"}</a>
                                        </span>

                                        <div className={`info mobile ${mobileInfo && "active"}`}>
                                            <button onClick={() => setMobileInfo(!mobileInfo)}>
                                                <span>{globe ? "About XXBLUE" : "엑스바이블루 사업자 정보"}</span>
                                            </button>

                                            {mobileInfo && (
                                                <span>
                                                    {globe ? (
                                                        <>
                                                            Name of company: XXBLUE
                                                            <br />
                                                            Business registration number: 755-86-01476
                                                            <br />
                                                            Name of representative: Lee Jung Bong
                                                            <br />
                                                            Address: 317, Dosan-daero, Gangnam-gu, Seoul, Republic of Korea
                                                            <br />
                                                            Contact: +82 25451476
                                                            <br />
                                                            Email: info@dropkitchen.xyz
                                                            <br />
                                                            Ecommerce registration number: 2019-서울강남-03088Check Business Info &nbsp;
                                                        </>
                                                    ) : (
                                                        <>
                                                            상호명 : 엑스바이블루
                                                            <br />
                                                            사업자번호 : 755-86-01476
                                                            <br />
                                                            대표자명 : 이정봉
                                                            <br />
                                                            주소 : 서울 특별시 강남구 도산대로 317, 7층 (신사동, 호림아트센터1빌딩)
                                                            <br />
                                                            연락처 : 02-545-1476
                                                            <br />
                                                            이메일 : info@dropkitchen.xyz
                                                            <br />
                                                            통신판매업신고번호 : 2019-서울강남-03088 &nbsp;
                                                        </>
                                                    )}
                                                    <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=7558601476&apv_perm_no=">{globe ? "Check Business Info" : "사업자정보확인"}</a>
                                                </span>
                                            )}
                                        </div>

                                        <span className="copy-right">
                                            &copy; dropkichen<sup>TM</sup>2023
                                        </span>
                                    </footer>
                                </section>
                            </div>
                        </ReactFullpage.Wrapper>
                    );
                }}
            />

            {scrollStep !== 4 && (
                <div className="scroll-wrap">
                    {scrollStep === 0 && <span className="scroll-wrap-text">SCROLL DOWN</span>}
                    <img
                        src="https://asset.dropkitchen.xyz/contents/202307_dev/angle-down.svg
"
                    />
                </div>
            )}

            {!cookieIs && (
                <div className="cookie-modal">
                    <p>
                        {globe
                            ? `We use cookies on our website to give you the
                                best service experience.`
                            : `최고의 서비스를 제공하기 위해 쿠키를 사용합니다.`}{" "}
                        &nbsp;
                        <a href="/privacy">{globe ? "Read more" : "자세히 보기"}</a>
                    </p>
                    <button
                        onClick={() => {
                            localStorage.setItem("cookieIs", true);
                            setCookieIs(true);
                        }}
                    >
                        OK!
                    </button>
                </div>
            )}
        </div>
    );
});

export default Home;
