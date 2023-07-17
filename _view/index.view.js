import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, {
    useState,
    useEffect,
    useRef,
    createRef,
    forwardRef,
} from "react";
import { observer } from "mobx-react-lite";
import { Player, ControlBar } from "video-react";
import { isAndroid, isIOS, isMobile } from "react-device-detect";
import { SectionsContainer, Section } from "react-fullpage";
import ReactFullpage from "@fullpage/react-fullpage";

const Home = observer((props) => {
    const router = useRouter();

    return <>Test</>;
});

export default Home;
