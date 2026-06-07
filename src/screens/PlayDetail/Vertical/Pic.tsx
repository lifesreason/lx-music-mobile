import { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
// import { useLayout } from '@/utils/hooks'
import { createStyle } from '@/utils/tools'
import { usePlayerMusicInfo } from '@/store/player/hook'
import { useWindowSize } from '@/utils/hooks'
import { NAV_SHEAR_NATIVE_IDS } from '@/config/constant'
import { useNavigationComponentDidAppear } from '@/navigation'
import { HEADER_HEIGHT } from './components/Header'
import Image from '@/components/common/Image'
import { useStatusbarHeight } from '@/store/common/hook'
import commonState from '@/store/common/state'
import { useTheme } from '@/store/theme/hook'


export default ({ componentId }: { componentId: string }) => {
  const musicInfo = usePlayerMusicInfo()
  const { width: winWidth, height: winHeight } = useWindowSize()
  const statusBarHeight = useStatusbarHeight()
  const theme = useTheme()

  const [animated, setAnimated] = useState(!!commonState.componentIds.playDetail)
  const [pic, setPic] = useState(musicInfo.pic)
  useEffect(() => {
    if (animated) setPic(musicInfo.pic)
  }, [musicInfo.pic, animated])

  useNavigationComponentDidAppear(componentId, () => {
    setAnimated(true)
  })
  // console.log('render pic')

  const [discStyle, imageStyle] = useMemo(() => {
    const imgWidth = Math.min(winWidth * 0.68, (winHeight - statusBarHeight - HEADER_HEIGHT) * 0.46)
    const discWidth = imgWidth + 34
    return [{
      width: discWidth,
      height: discWidth,
      borderRadius: discWidth / 2,
      padding: 17,
      backgroundColor: theme.isDark ? theme['c-150'] : '#171717',
    }, {
      width: imgWidth,
      height: imgWidth,
      borderRadius: imgWidth / 2,
    }]
  }, [statusBarHeight, theme, winHeight, winWidth])

  return (
    <View style={styles.container}>
      <View style={{ ...styles.content, ...discStyle, elevation: animated ? 8 : 0 }}>
        <Image url={pic} nativeID={NAV_SHEAR_NATIVE_IDS.playDetail_pic} style={imageStyle} />
        <View style={{ ...styles.centerDot, backgroundColor: theme['c-content-background'], borderColor: theme.isDark ? theme['c-250'] : theme['c-100'] }} />
      </View>
    </View>
  )
}

const styles = createStyle({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    // elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDot: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 8,
  },
})
