module.exports = {
  root: true,
  env: {
    node: true
  },
  //extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  extends: ['plugin:vue/essential', 'prettier','prettier/vue'],  
  parserOptions: {
    parser: 'babel-eslint',
	sourceType: 'module',
    'ecmaVersion': 2020	
  },
  ignorePatterns: ['/src/modules/*/libs/*'],
  // required to lint *.vue files  
  plugins: [
    'vue'
  ],  
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'vue/no-unused-components': 'off',
    'quotes':[1,'single']	
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
