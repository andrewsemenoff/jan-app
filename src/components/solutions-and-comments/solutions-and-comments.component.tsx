import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import SvgIcon, {
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import Comments from "../comments/comments.component";
import Solutions from "../solutions/solutions.component";

interface SolutionsAndCommentsProps {
  problemId: string;
}

const SolutionsAndComments = ({
  problemId
}: SolutionsAndCommentsProps) => {
  const [swiper, setSwiper] = useState<any>();
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab
          icon={
            <SvgIcon
              svgPath={SVG_PATH.SOLUTIONS}
              fill={activeTab === 0 ? "#0984e3" : "#808080"}
            />
          }
          label="Solutions"
          onClick={() => swiper.slideTo(0)}
        />
        <Tab
          icon={
            <SvgIcon
              svgPath={SVG_PATH.COMMENTS}
              fill={activeTab === 1 ? "#0984e3" : "#808080"}
            />
          }
          label="Comments"
          onClick={() => swiper.slideTo(1)}
        />
      </Tabs>
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
      >
        <SwiperSlide>
          <Solutions problemId={problemId} />
        </SwiperSlide>
        <SwiperSlide>
          <Comments problemId={problemId} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SolutionsAndComments;
