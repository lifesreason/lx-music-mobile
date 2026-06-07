
import { memo } from 'react'

import Slider, { type SliderProps } from '@react-native-community/slider'
import { useTheme } from '@/store/theme/hook'
import { createStyle } from '@/utils/tools'

export type {
  SliderProps,
}

export default memo(({ value, minimumValue, maximumValue, onSlidingStart, onSlidingComplete, onValueChange, step }: SliderProps) => {
  const theme = useTheme()

  return (
    <Slider
      value={value}
      style={styles.slider}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      minimumTrackTintColor={theme['c-primary']}
      maximumTrackTintColor={theme['c-primary-background-hover']}
      thumbTintColor={theme['c-primary']}
      onSlidingStart={onSlidingStart}
      onSlidingComplete={onSlidingComplete}
      onValueChange={onValueChange}
      step={step}
    />
  )
})


const styles = createStyle({
  slider: {
    flexShrink: 0,
    flexGrow: 1,
    // width: '100%',
    maxWidth: 300,
    height: 40,
    marginTop: -6,
    marginBottom: 8,
  },
})
