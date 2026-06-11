import IconButton from "./components/IconButton/IconButton";
import IconComponent from "./components/IconComponent/IconComponent";
import { Button } from "./components";
import img from './assets/bg-buildings.png'
// Usage
export default function App() {
  return (
    <div style={{ fontSize: "10px", }}>

      <div style={{ position: "fixed"}}>
        <IconButton icon="Ic_Flash_Filled" />
      </div>
      <img alt="img" src={img} style={{ width: "100%", height: "100%" }} />
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reprehenderit illum hic incidunt maxime assumenda qui quidem error dolor ducimus adipisci quo nemo tempora iusto maiores, aliquam porro quod nulla.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reprehenderit illum hic incidunt maxime assumenda qui quidem error dolor ducimus adipisci quo nemo tempora iusto maiores, aliquam porro quod nulla.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reprehenderit illum hic incidunt maxime assumenda qui quidem error dolor ducimus adipisci quo nemo tempora iusto maiores, aliquam porro quod nulla.</p>
    </div>
  );
}