<img width="996" alt="image" src="https://i.imgur.com/rqiWIxp.png">

<div align="center"> 
<h1> Darklify </h1>
<p> Change the way you percieve and work with dark theme in react-native </p>
</div>

## Installation
To start using ```darklify``` please verify your version of ```react-native``` is ```0.63.3``` or higher.
```
npm i darklify
```

## About 
Darklify was made possible to avoid boring boilerplaiting of ```useColorScheme()``` in react-native. Written in Typescript with full types-support utilising the POP architecture.

## How do I use it ?

### Hooks
```useDarklifyMode()```
Example usage
```ts
import { useDarklifyMode } from 'darklify'

function Component() {
	const darkModeEnabled = useDarklifyMode()
	return <View style={{ backgroundColor: darkModeEnabled ? 'black' : 'white' }} />
}
```
```useDarklifyValue()```
Step into the world of Darklify, where each Dynamic keyword takes on the mystique of Darklify. Witness the logos transcend from the brilliance of light to the depths of shadow, guided by the whispers of the theme. Allow your interface to be a canvas of enchantment, where elements shift and change, responding to the captivating allure of the current theme.
```ts
import { DarklifyValue, useDarklifyValue } from 'react-native-darklify'

const luminaryLightLogo = require('./light.png')
const obsidianDarkLogo = require('./dark.png')
const logoMetamorphosis = new DarklifyValue(luminaryLightLogo, obsidianDarkLogo)

function Insignia() {
	const essence = useDarklifyValue(logoMetamorphosis)
	return <Image source={essence} />
}
```

### Helper Classes
```DarklifyValue```
Crafted to seamlessly intertwine with DarklifyStylesheet and wield the power of useDarklifyValue. Immerse yourself in its brilliance: furnish the first argument to orchestrate a symphony with your light color palette, while the second argument conducts a mesmerizing dance within the depths of your dark color scheme. Unleash the magic that transcends mere styling and elevates your design to an enchanting crescendo.
```ts
import { DarklifyValue } from 'darklify'

// Unveil a canvas of wonder, where colors transcend time
const mysticalBackdrop = new DarklifyValue('white', 'black')
```

### Custom Stylesheet
Unveil the art of Darklify, where code becomes an incantation and your interface dances with shadows:


```ts
import { DarklifyStyleSheet, DarklifyValue, useDarklifyValue } from 'darklify'

const darklifiedStyles = new DarklifyStyleSheet({
	container: {
		backgroundColor: new DarklifyValue('white', 'black'),
		flex: 1,
	},
	text: {
		color: new DarklifyValue('black', 'white'),
		textAlign: 'center',
	},
})

function EnchantedComponent() {
	const styles = useDarklifyValue(darklifiedStyles)

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Whispers in the Void</Text>
		</View>
	)
}
```

### Providers
Embark on a journey through the tapestry of themes with a touch of enchantment of each component:
```ts
import { ColorSchemeProvider } from 'darklify'

function EnchantedScreen() {
	return (
		<>
			{/* Immerse in the shadows of the dark theme */}
			<ColorSchemeProvider mode="dark">
				<EnchantedComponent />
			</ColorSchemeProvider>

			{/* Bask in the radiance of the light theme */}
			<ColorSchemeProvider mode="light">
				<EnchantedComponent />
			</ColorSchemeProvider>

			{/* Dance with the spirits of the current theme */}
			<EnchantedComponent />
		</>
	)
}
```




