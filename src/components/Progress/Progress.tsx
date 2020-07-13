import React, { FC } from 'react'
import { ThemeProps } from '../Icon/Icon'
export interface ProgressProps {
  /** 百分比 */
  percent: number;
  /** 进度条高度 */
  strokeHeight?: number;
  /** 显示的文本 */
  showText?: boolean;
   /** wrapper styles */
  styles?: React.CSSProperties;
  /** theme 进度条主题颜色 */
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props
  return (
    <div className="viking-progress-bar" style={styles}>
      <div className="viking-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div 
          className={`viking-progress-bar-inner color-${theme}`}
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
}
export default Progress;