import { useRef, useState } from "react";
import "./App.css";
import { addEffect, Canvas } from "@react-three/fiber";
import {
  Bounds,
  Box,
  Center,
  Loader,
  OrbitControls,
  Preload,
  View,
} from "@react-three/drei";
import Lenis from "lenis";
import "./materials";
import "./shaders";
import { Common } from "./Scene";
import AbstractComponent from "./components/AbstractComponent";
import { Link } from "wouter";
import { useTransition, a } from "@react-spring/three";

const images = ["/assets/images/stock-1.jfif", "/assets/images/stock-2.jfif"];

const lenis = new Lenis({ syncTouch: true });
addEffect((t) => lenis.raf(t));

export default function App() {
  const image = useRef<HTMLImageElement>(null);
  const [imageSrc] = useState(images[0]);

  return (
    <div className="w-full text-center p-10">
      <div className="space-x-5">
        <Link href="/">Home</Link>
        <Link href="/page-1">Page 1</Link>
        <Link href="/page-2">Page 2</Link>
        <Link href="/page-3">Page 3*</Link>
      </div>
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
      <View className="fixed inset-0 z-10">
        <Common color={0x000000} />
        <group>
          {/* <AnimatedRoutes3D /> */}
          <Bounds fit clip observe>
            <Center>
              <AbstractComponent color={"lime"} />
            </Center>
          </Bounds>
          {/* <Box>
          </Box> */}
        </group>
        {/* <ExitAnimation /> */}
      </View>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
          zIndex: 10,
        }}
        eventSource={document.getElementById("root") as HTMLElement}
      >
        <View.Port />
        <Preload all />
      </Canvas>
      <Loader />
    </div>
  );
}

// function AnimatedRoutes3D() {
//   // Call useRoute for each route at the top level
//   const [matchHome] = useRoute("/");
//   const [matchPage1] = useRoute("/page-1");
//   const [matchPage2] = useRoute("/page-2");

//   // Find the currently matched route
//   let visible = null;
//   if (matchHome) visible = { key: "/", color: "lime" };
//   else if (matchPage1) visible = { key: "/page-1", color: "yellow" };
//   else if (matchPage2) visible = { key: "/page-2", color: "pink" };

//   const transitions = useTransition(visible, {
//     from: { scale: 0, position: -2 },
//     enter: { scale: 1, position: 0 },
//     leave: { scale: 0, position: 2 },
//     config: { tension: 170, friction: 26 },
//     keys: visible ? visible.key : null,
//   });

//   return (
//     <>
//       <pointLight intensity={1} position={[0, 5, 0]} />
//       {transitions((style, item) =>
//         item ? (
//           <a.group
//             scale={style.scale}
//             position-x={style.position}
//             key={item.key}
//           >
//             <AbstractComponent color={item.color} />
//           </a.group>
//         ) : null
//       )}
//     </>
//   );
// }

export function ExitAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  const transitions = useTransition(isVisible, {
    from: { scale: 0, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 0, opacity: 0 },
    config: { tension: 170, friction: 26 },
  });

  return (
    <>
      {transitions((style, item) =>
        item ? (
          <a.group scale={style.scale}>
            <AbstractComponent color="teal" />
          </a.group>
        ) : null
      )}
      <Box position={[1, 0, 0]} onClick={() => setIsVisible((v) => !v)}>
        {isVisible ? "Hide" : "Show"}
      </Box>
    </>
  );
}
