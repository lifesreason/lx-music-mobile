import { memo } from 'react'
import { View } from 'react-native'
import Button from '@/components/common/Button'

import { createStyle } from '@/utils/tools'
import { pop } from '@/navigation'
import { useTheme } from '@/store/theme/hook'
import commonState from '@/store/common/state'
import Text from '@/components/common/Text'
import { handleCollect, handlePlay } from './listAction'
import songlistState from '@/store/songlist/state'
import { useI18n } from '@/lang'
import { useListInfo } from './state'
import { Icon } from '@/components/common/Icon'
// import { NAV_SHEAR_NATIVE_IDS } from '@/config/constant'

export default memo(() => {
  const theme = useTheme()
  const t = useI18n()
  const info = useListInfo()

  const back = () => {
    void pop(commonState.componentIds.songlistDetail!)
  }

  const handlePlayAll = () => {
    if (!songlistState.listDetailInfo.info.name) return
    void handlePlay(info.id, info.source, songlistState.listDetailInfo.list)
  }

  const handleCollection = () => {
    if (!songlistState.listDetailInfo.info.name) return
    void handleCollect(info.id, info.source, songlistState.listDetailInfo.info.name || info.name)
  }

  return (
    <View style={{ ...styles.container, backgroundColor: theme['c-content-background'] }}>
      <Button onPress={handleCollection} style={{ ...styles.controlBtn, backgroundColor: theme['c-primary-background'] }}>
        <Icon name="love" color={theme['c-primary']} size={15} />
        <Text style={{ ...styles.controlBtnText, color: theme['c-primary'] }}>{t('collect_songlist')}</Text>
      </Button>
      <Button onPress={handlePlayAll} style={{ ...styles.controlBtnPrimary, backgroundColor: theme['c-primary'] }}>
        <Icon name="play" color="#fff" size={15} />
        <Text style={{ ...styles.controlBtnText, color: '#fff' }}>{t('play_all')}</Text>
      </Button>
      <Button onPress={back} style={{ ...styles.controlBtn, backgroundColor: theme['c-primary-background'] }}>
        <Icon name="chevron-left" color={theme['c-primary']} size={15} />
        <Text style={{ ...styles.controlBtnText, color: theme['c-primary'] }}>{t('back')}</Text>
      </Button>
    </View>
  )
})

const styles = createStyle({
  container: {
    flexDirection: 'row',
    width: '100%',
    flexGrow: 0,
    flexShrink: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  controlBtn: {
    flexGrow: 1,
    flexShrink: 1,
    width: '33%',
    paddingVertical: 9,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnPrimary: {
    flexGrow: 1,
    flexShrink: 1,
    width: '33%',
    paddingVertical: 9,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnText: {
    fontSize: 13,
    textAlign: 'center',
    paddingLeft: 4,
  },
})
