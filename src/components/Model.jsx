import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ModelView from "./ModelView"
import { yellowImg } from "../utils";
import { useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

const Model = () => {
    const [size, setsize] = useState('small');
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['#8F*A81', '#FFE&B9', '#6F6C64'],
        img: yellowImg,
    });
    // camera control for the model view
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();
    // Model
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    // rotation
    const [smallRotation, setsmallRotation] = useState(0);
    const [largeRotation, setlargeRotation] = useState(0);

    useGSAP(() =>{
        gsap.to('#heading', {y:0, opacity:1})
    })
  return (
    <section className="common-padding">
        <div className="screen-max-width">
            <h1 id="heading" className="section-heading">
                Take a closer look.
            </h1>
            <div className="fle flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[90vh
                overflow-hidden relative">
                    <ModelView
                    index ={1}
                    groupRef = {small}
                    gsapType = 'view1'
                    controlRef ={cameraControlSmall}
                    setRotationState ={setsmallRotation}
                    item = {model}
                    size = {size}
                    />
                    <ModelView
                    index ={2}
                    groupRef = {large}
                    gsapType = 'view2'
                    controlRef ={cameraControlLarge}
                    setRotationState ={setlargeRotation}
                    item = {model}
                    size = {size}
                    />
                    <Canvas
                    className="w-full h-full"
                    style={{
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        overflow: "hidden"
                    }}
                    eventSource={document.getElementById('root')}
                    >
                        <View.Port />
                    </Canvas>
                </div>
                
            </div>
        </div>
    </section>
  )
}

export default Model