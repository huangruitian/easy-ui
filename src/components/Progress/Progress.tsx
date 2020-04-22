import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { ThemeProps } from '../Icon/Icon'


export interface ProgressProps {
  percent:number
  strokeHeight?:number
  showText?:boolean
  style?:CSSProperties
  theme? : ThemeProps
}

const Progress: React.FC<ProgressProps> = (props) => {
  const { 
    percent,
    strokeHeight,
    showText,
    style,
    theme,
   } = props
  return (
    <div className="viking-progress-bar" style={style}>
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
    strokeHeight:15,
    showText:true,
    theme:"primary"
}

export default Progress