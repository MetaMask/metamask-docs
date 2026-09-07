// Import the original mapper
import PasswordlessLoginExamples from '@site/src/components/PasswordlessLoginExamples'
import Pill from '@site/src/components/Pill'
import SocialLoginExamples from '@site/src/components/SocialLoginExamples'
import MDXComponents from '@theme-original/MDXComponents'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Pill,
  PasswordlessLoginExamples,
  SocialLoginExamples,
}
