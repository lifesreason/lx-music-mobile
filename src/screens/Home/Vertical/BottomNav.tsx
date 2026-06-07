import { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { NAV_MENUS } from '@/config/constant'
import { useI18n } from '@/lang'
import { useNavActiveId } from '@/store/common/hook'
import { useTheme } from '@/store/theme/hook'
import { setNavActiveId } from '@/core/common'
import { Icon } from '@/components/common/Icon'
import Text from '@/components/common/Text'
import { createStyle } from '@/utils/tools'
import { BorderWidths } from '@/theme'
import { useKeyboard } from '@/utils/hooks'

export default memo(() => {
  const theme = useTheme()
  const t = useI18n()
  const activeId = useNavActiveId()
  const { keyboardShown } = useKeyboard()

  if (keyboardShown) return null

  return (
    <View style={{ ...styles.container, backgroundColor: theme['c-content-background'], borderTopColor: theme['c-border-background'] }}>
      {NAV_MENUS.map(({ id, icon }) => {
        const active = activeId == id
        const color = active ? theme['c-primary'] : theme['c-500']
        return (
          <TouchableOpacity key={id} style={styles.item} activeOpacity={0.7} onPress={() => { setNavActiveId(id) }}>
            <Icon name={icon} color={color} size={20} />
            <Text style={styles.label} color={color} size={11} numberOfLines={1}>{t(id)}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
})

const styles = createStyle({
  container: {
    height: 54,
    borderTopWidth: BorderWidths.normal,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    paddingTop: 2,
  },
})
