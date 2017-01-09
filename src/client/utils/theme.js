import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import {darken} from 'material-ui/utils/colorManipulator'

const BRAND_RED = '#FB802A';

const THEME = Object.assign({}, lightBaseTheme, {
	palette: {
		...lightBaseTheme.palette,
		primary2Color: darken(BRAND_RED, 0.12),
		primary1Color: BRAND_RED
	}
});

export default THEME