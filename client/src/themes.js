import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  shadows: { outline: '0px 0px 0px 4px #FED7E2' },

  styles: {
    global: {
      // styles for the `body`
      _selection: {
        backgroundColor: 'pink.100',
      },
      body: {
        bg: 'gray.50',
      },
      article: {
        bg: 'white',
        rounded: 'md',
        boxShadow: 'md',
        p: '5',
        marginBottom: '5',
        ul: {
          listStyle: 'initial',
          marginLeft: '1.5rem',
        },
        ol: {
          listStyle: 'numeral',
          marginLeft: '1.5rem',
        },
      },

      textarea: {
        bg: 'white',
      },

      input: {
        bg: 'white',
      },
      h3: {
        fontSize: 'lg',
      },
      h4: {
        fontSize: 'md',
      },
      blockquote: {
        position: 'relative',
        margin: '2rem auto',
        fontSize: '2rem',
        borderLeft: '3px solid #00cc8f',
        padding: '1rem 2rem 1rem 2rem',
        _after: {
          content: 'attr(cite)',
          display: 'block',
          textAlign: 'right',
          fontSize: '1.5rem',
        },
      },

      ul: {
        listStyle: 'none',
        margin: 0,
      },

      p: {
        wordBreak: 'break-word',
      },

      // styles for the `a`
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxWidth: '80ch',
      },
    },

    Textarea: {
      defaultProps: {
        focusBorderColor: 'pink.100',
      },
    },

    Input: {
      baseStyle: {
        _hover: {
          borderColor: 'pink.100',
        },
      },
      defaultProps: {
        focusBorderColor: 'pink.100',
      },
    },

    Button: {
      defaultProps: {
        colorScheme: 'teal',
      },
      variants: {
        solid: {
          _focus: {
            // color: 'teal.500',
          },
          _disabled: {
            cursor: 'default',
          },
        },
      },
    },
  },

  colors: {
    brand: {
      100: '#f7fafc',
      // ...
      900: '#1a202c',
    },
  },
})

export default theme
