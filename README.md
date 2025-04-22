# Node & Npm version

### `node v20.1.0 `

### `npm v9.8.1`

# Visual Code Extensions

Before start the project, please install all of extensions below:

1. `Bracket Pair Colorizer 2`
2. `JavaScript (ES6) code snippets`
3. `ESLint`
4. `Prettier` (need set to default)
5. `Typescript React code snippets`

# Code Conventions

Always organize import

- Window: `Alt + Shift + O`
- Mac: `Option + Shift + O`

# Struct of Project

```
│   .gitignore
│   package.json
│   README.md
│   tsconfig.json
|   vite.config.ts
│
├───public
│   │   favicon.ico
│
└───src
    │   App.tsx
    │   App.css
    │   main.tsx
    │   App.css
    │
    ├───app
    │       env.ts
    │
    ├───assets
    │   ├───icons
    │   │       index.ts
    │
    ├───components
    │   ├───Common
    │   │       ImageLoader.tsx
    │   │       LoadingPage.tsx
    │   │
    │   ├───CurrentWeather
    │   │       CurrentWeather.css
    │   │       CurrentWeather.tsx
    │
    ├───contexts
    │       WeatherContext.tsx
    ├───hooks
    │       useLocalStorage.ts
    │
    ├───models
    │   │   axios.types.ts
    │   │   weather.types.ts
    │
    ├───constants
    ├───pages
    │   └───HomePage
    │       │   HomePage.css
    │       │   HomePage.tsx
    │
    ├───hooks
    ├───services
    │   │   axios.ts
    │   │   weatherApi.ts
    │
    │
    └───utils
            dateUtils.ts
            index.ts
```

# Available Scripts

In the project directory, you can run:

#### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
