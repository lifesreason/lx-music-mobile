import { useRef, useImperativeHandle, forwardRef, useCallback } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet, type TextInputProps } from 'react-native'
import { Icon } from '@/components/common/Icon'
import { createStyle } from '@/utils/tools'
import { useTheme } from '@/store/theme/hook'
import { setSpText } from '@/utils/pixelRatio'

const styles = createStyle({
  content: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    borderRadius: 18,
    overflow: 'hidden',
  },
  input: {
    borderRadius: 18,
    paddingTop: 0,
    paddingBottom: 0,
    height: 36,
    paddingLeft: 12,
    paddingRight: 0,
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 14,
  },
  clearBtnContent: {
    flexGrow: 0,
    flexShrink: 0,
  },
  clearBtn: {
    height: 36,
    paddingLeft: 8,
    paddingRight: 12,
    justifyContent: 'center',
  },
})

export interface InputProps extends TextInputProps {
  onChangeText?: (value: string) => void
  onClearText?: () => void
  clearBtn?: boolean
  size?: number
}


export interface InputType {
  blur: () => void
  focus: () => void
  clear: () => void
  isFocused: () => boolean
}

export default forwardRef<InputType, InputProps>(({ onChangeText, onClearText, clearBtn, style, size = 14, ...props }, ref) => {
  const inputRef = useRef<TextInput>(null)
  const theme = useTheme()
  // const scaleClearBtn = useRef(new Animated.Value(0)).current

  useImperativeHandle(ref, () => ({
    blur() {
      inputRef.current?.blur()
    },
    focus() {
      inputRef.current?.focus()
    },
    clear() {
      inputRef.current?.clear()
    },
    isFocused() {
      return inputRef.current?.isFocused() ?? false
    },
  }))

  // const showClearBtn = useCallback(() => {
  //   Animated.timing(scaleClearBtn, {
  //     toValue: 1,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start()
  // }, [scaleClearBtn])
  // const hideClearBtn = useCallback(() => {
  //   Animated.timing(scaleClearBtn, {
  //     toValue: 0,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start()
  // }, [scaleClearBtn])

  const clearText = useCallback(() => {
    inputRef.current?.clear()
    // hideClearBtn()
    onChangeText?.('')
    onClearText?.()
  }, [onChangeText, onClearText])

  const changeText = useCallback((text: string) => {
    // if (text.length) {
    //   showClearBtn()
    // } else {
    //   hideClearBtn()
    // }
    onChangeText?.(text)
  }, [onChangeText])

  return (
    <View style={{ ...styles.content, backgroundColor: theme['c-primary-input-background'] }}>
      <TextInput
        autoCapitalize="none"
        onChangeText={changeText}
        autoComplete="off"
        style={StyleSheet.compose({
          ...styles.input,
          backgroundColor: theme['c-primary-input-background'],
          color: theme['c-font'],
          fontSize: setSpText(size),
        }, style)}
        placeholderTextColor={theme['c-500']}
        selectionColor={theme['c-primary']}
        ref={inputRef} {...props} />
      {/* <View style={styles.clearBtnContent}>
      <Animated.View style={{ ...styles.clearBtnContent, transform: [{ scale: scaleClearBtn }] }}> */}
        {clearBtn
          ? <View style={styles.clearBtnContent}>
              <TouchableOpacity style={styles.clearBtn} onPress={clearText}>
                <Icon name="remove" color={theme['c-500']} size={11} />
              </TouchableOpacity>
            </View>
          : null
        }
      {/* </Animated.View>
      </View> */}
    </View>
  )
})
