import {Avatar} from 'flowbite-react';
import { IUser } from "../../../types"

const dayjs = require("dayjs")

const Detail = ({user}: {user: IUser}) => {

  const toInitials = (str: string): string => 
    str
      // split string into array of strings (example: "fiRsT reSPoNsE AcAdEmY" ==> ["fiRsT", "reSPoNsE", "AcAdEmY"])
    .split(" ") 
      // map over words and return a capitalized first letter of each word (example: ["fiRsT", "reSPoNsE", "AcAdEmY"] ==> ["F", "R", "A"])
    .map(c => c.charAt(0).toUpperCase())
      // join letters to single string (example: ["F", "R", "A"] ==> "FRA") 
    .join("") 
      // append second letter of first word to this new string (example: "FRA" ==> "FRAI")
    .concat(str.charAt(1).toUpperCase())
      // limit this new string to 2 characters (example: "FRAI" ==> "FR")
    .substring(0, 2);

  return <div>
    <div className="flex flex-col items-center justify-start">
      <Avatar
        placeholderInitials={toInitials(`${user.first_name} ${user.last_name}`)}
        size="lg"
        color="purple"
        rounded={true}
      />
      <div className="mt-5">
        <h3 className="mb-1 text-xl font-[600] text-center text-gray-900 dark:text-white">
          {user.first_name} {user.last_name}
        </h3>
        <h5 className="mb-1 text-center text-xl font-medium text-gray-900 dark:text-white">
          {user.email}
        </h5>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          {user.job}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="text-sm text-gray-500 dark:text-gray-400 gap-2">
            <i className="fas fa-phone"></i> {user.phone}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 gap-2">
            <i className="fas fa-calendar-alt"></i> {dayjs(new Date(user.date_of_birth)).format("MMM D, YYYY")}
          </div>
          <div className="text-sm capitalize  text-gray-500 dark:text-gray-400 gap-2">
            <i className="fas fa-transgender-alt capitalize "></i> {user.gender}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 gap-2">
            <i className="fas fa-phone"></i> {user.phone}
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          <i className="fas fa-map-marker-alt"></i> {user.state}, {user.street}, {user.city}, {user.country}
        </div>
      </div>
    </div>
  </div>
}

export default Detail;