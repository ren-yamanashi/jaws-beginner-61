import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'no-new': 'off',
      'no-console': 'warn',
    },
  },
)
