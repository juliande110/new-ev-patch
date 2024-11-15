import { ReactNode } from 'react'

export interface IHeadline {
  as: THeadlineOptions
  children?: any
  className?: string
}

export type THeadlineOptions =
  | 'hero'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'

export interface IParagraph {
  size?: TParagraphSizes
  variant?: TParagraphVariants
  children?: any
}

export type TParagraphSizes = 'small' | 'regular' | 'large' | 'xlarge'
export type TParagraphVariants = 'regular' | 'bold' | 'link'

export interface ILabel {
  size?: TLabelSizes
  children?: any
}

export type TLabelSizes = 'small' | 'regular' | 'large'

export interface IBadge {
  size?: TBadgeSizes
  children?: any
  disabled?: boolean
}

export type TBadgeSizes = 'small' | 'regular' | 'large'

export interface IDisplayButton {
  title: string
  onClick?: any
  disabled?: boolean
  isLoading?: boolean
  color?: TButtonColors
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  className?: string
}

export type TButtonColors =
  | 'default'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'pink'
  | 'purple'
  | 'blue'
  | 'cyan'
export type TActionButtonColors =
  | 'primary'
  | 'secondary'
  | 'paper'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'pink'
  | 'purple'
  | 'blue'
  | 'silver'
  | 'cyan'

export interface IActionButton {
  title: string
  onClick?: any
  disabled?: boolean
  isLoading?: boolean
  size?: TActionButtonSizes
  color?: TActionButtonColors
  className?: string
}

export interface IPrimaryButton {
  title: string
  onClick?: any
  disabled?: boolean
  isLoading?: boolean
  icon?: ReactNode
  size?: TActionButtonSizes
  color?: TActionButtonColors
  className?: string
}

export type TActionButtonSizes = 'medium' | 'large'

export interface IPlayButton {
  onClick?: any
  disabled?: boolean
  isLoading?: boolean
  icon?: ReactNode
  size?: TActionButtonSizes
  color?: TActionButtonColors
  className?: string
}

export type TTheme = 'light' | 'dark' | 'bios'
