/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import NewsletterLeaderBoardVerification from './NewsletterLeaderBoardVerification';

const InputNewsletterInfoForm = ({ user }) => {

  return (
    <div>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <NewsletterLeaderBoardVerification user={user}></NewsletterLeaderBoardVerification>
        </div>
      </div>

      
    </div>
  )
}

export default InputNewsletterInfoForm;