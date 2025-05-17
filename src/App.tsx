import { useRef, useState } from "react";
import "./App.css";
import { addEffect, Canvas } from "@react-three/fiber";
import { Box, OrbitControls, Preload, View } from "@react-three/drei";
import Lenis from "lenis";
import "./shaders";
import { Common } from "./Scene";
import AbstractComponent from "./components/AbstractComponent";

const images = [
  "https://images.unsplash.com/photo-1746903781349-bd2a9e45960c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1746950862738-399b20e6f0eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const lenis = new Lenis({ syncTouch: true });
addEffect((t) => lenis.raf(t));

export default function App() {
  const image = useRef<HTMLImageElement>(null);
  const [imageSrc] = useState(images[0]);

  return (
    <>
      <div className="h-full p-10 z-0">
        <div className="grid grid-cols-12 my-40">
          <div className="relative col-span-6 col-start-2">
            Sessizlik hiç gerçekten sessiz mi? Dünya her an hareket hâlinde.
            Havanın sürtünmesi, gezegenin dönüşü, uzayın derinliklerindeki
            titreşimler… Peki neden bazı anlarda yalnızca bir boşluk
            hissediyoruz?
          </div>
          <div className="col-span-12 mt-20">
            <div className="relative inline-block">
              <img
                ref={image}
                className="max-h-96 h-full w-auto invisible"
                src={imageSrc}
                alt="Test Image"
              />
              <View className="absolute inset-0 border-2 border-amber-400">
                <Common color={0x000000} />
                <Box onPointerEnter={() => {}} />
              </View>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 my-40 z-0">
          <div className="relative col-span-6 col-start-6">
            Gerçek sessizlik, yalnızca duyamadığımız bir şey mi? Yoksa zihnimiz,
            var olan ama fark edemediğimiz sesleri bastırıyor mu? İçinde
            bulunduğun bu an, sessiz görünüyor. Ama dikkatlice dinlersen, belki
            de burada hiç beklemediğin bir ses var.
          </div>
          <div className="relative col-span-6 col-start-4 mt-20">
            <View className="w-full h-60 border-2 border-amber-400">
              <Common color={0x000000} />
              <Box>
                <meshNormalMaterial />
              </Box>
            </View>
          </div>
        </div>
        <div className="grid grid-cols-12 my-40 z-0">
          <div className="col-span-4">
            Bir sessizliğin gerçekten boş olup olmadığını nasıl anlarsın?
          </div>
        </div>
        <div className="relative min-h-[300vh]">
          <div className="sticky top-20">
            <View className="border-2 border-amber-400 w-40 h-40">
              <Common color={0x000000} />
              <Box />
              <OrbitControls autoRotate />
            </View>
          </div>
        </div>
        <div className="">
          <div>
            Eğer hiçbir ses yoksa, neden hâlâ bir şeyleri duyar gibi
            hissediyoruz?
          </div>
          <div className="col-span-12 mt-20">
            <View className="w-96 h-48 border-2 border-amber-400">
              <Common color={0x000000} />
            </View>
          </div>
        </div>
      </div>
      <View className="fixed inset-0 -z-10">
        <Common color={0x000000} />
        {/* <Sphere>
          <customShaderMaterial time={1} />
        </Sphere> */}
        <AbstractComponent />
        <OrbitControls />
      </View>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
        }}
        eventSource={document.getElementById("root") as HTMLElement}
      >
        <View.Port />
        <Preload all />
      </Canvas>
    </>
  );
}
