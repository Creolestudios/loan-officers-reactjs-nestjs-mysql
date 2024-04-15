const theme = {};

theme.palette = {
  primary: [
    '#4FB263', // 0: Default (LO & Admin)
    '#4482FF', // 1:
    '#3A78F5', // 2: Darken 4%
    '#3775F2', // 3: Darken 5%
    'rgba(68, 130, 255, 0.2)', // 4: Fade 20%
    '#4C8AFF', // 5: Lighten 3%
    'rgba(68, 130, 255, 0.75)', // 6: Fade 75%
    '#6AA8FF', // 7: Lighten 15%
    '#63A1FF', // 8: Lighten 12%
    '#3F7DFA', // 9: Darken 2%
    '#3369e7', // 10: Algolia color
    '#5896FF', // 11: Lighten 8%
    '#2b69e6', // 12:
    '#236cfe', // 13: darken 10%
    '#4d88ff', // 14: Lighten 5%
    '#3e8f4e', // 15: DarkGreen
  ],
  secondary: [
    '#2d3446', // 0: DarkBlue
    '#f1f3f6', // 1: LightBluish
    '#788195', // 2: LightBlue
    '#E4E6E9', // 3: LightBluish Darken 5%
    '#364d79', // 4:
    '#202739', // 5: DarkBlue Darken 5%
    '#f5f6f8', // 6: LighterBluish
    '#e9ebf1', // 7: DarkBluish
    '#F6F8FB', // 8: LighterBluish Lighten 2%
    '#E9EBEE', // 9: LighterBluish Darken 3%
    '#1a1a1a', // 10: Sidebar submenu select
    '#1F2428', // 11: Sidebar main dark shade
  ],
  color: [
    '#FEAC01', // 0: Orange
    '#42299a', // 1: Purple
    '#F75D81', // 2: Pink
    '#7ED321', // 3: LimeGreen
    '#39435f', // 4: BlueShade
    '#FFCA28', // 5: Yellow
    '#F2BD1B', // 6: Yellow Darken 5%
    '#3b5998', // 7: Facebook
    '#344e86', // 8: Facebook Darken 5%
    '#dd4b39', // 9: Google Plus
    '#d73925', // 10: Google Plus Darken 5%
    '#e14615', // 11: Auth0
    '#ca3f13', // 12: Auth0
    '#e0364c', // 13: themeColor--AlizarinCrimson
    '#EB4949', // 14: Red
    '#b81f1f', // 15: DarkRed
    '#0099ef', // 16: linkblue
  ],
  warning: [
    '#ffbf00', // 0: Warning
  ],
  success: [
    '#00b16a', // 0: Success
  ],
  error: [
    '#f64744', // 0: Error
    '#EC3D3A', // 1: Darken 4%
    '#FF5B58', // 2: Lighten 8%
  ],
  grayscale: [
    '#bababa', // 0: GreyShade
    '#c1c1c1', // 1: GreyDark
    '#D8D8D8', // 2: Grey
    '#f1f1f1', // 3: GreyAlt
    '#F3F3F3', // 4: GreyLight
    '#fafafa', // 5: DarkWhite
    '#F9F9F9', // 6: DarkerWhite
    '#fcfcfc', // 7: #fff Darken 1%
    '#eeeeee', // 8:
    '#fbfbfb', // 9:
    '#f5f5f5', // 10:
    '#f7f8f9', // 11: today-highlight-bg
    '#b8bcbf', // 12: Admin Breadcrumb Disable
    '#F7F8FA', // 13: Profile tab editor
  ],
  text: [
    '#1F2428', // 0: Heading
    '#1F2428', // 1: HeadingLight
    '#979797', // 2: Text
    '#797979', // 3: TextDark
    '#6a6c6a', // 4: Heading Lighten 22%
    '#ffffff', // 5: White,
    '#72757c', // 6: Active tab text
  ],
  label: [
    '#8D8E90', // 0: Input Label
  ],
  border: [
    '#E6E7EB', // 0: Border
    '#d8d8d8', // 1: BorderDark
    '#ebebeb', // 2: BorderLight
    '#d3d3d3', // 3:
    'rgba(228, 228, 228, 0.65)', // 4:
    '#CACACA', // 5: Greyborder
    '#8A8A8A', // 6: Darkgreyborder
  ],
  monochrome: ['#ffffff', '#000000'],
  calendar: [
    '#905', // 0:
    '#690', // 1:
    '#a67f59', // 2:
    '#07a', // 3:
    '#dd4a68', // 4:
    '#e90', // 5:
  ],
};

theme.fonts = {
  primary: 'Heebo, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
};

export default theme;