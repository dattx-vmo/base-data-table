import { Badge } from "flowbite-react";

interface Ioption {color: string; icon: string}

const Category = ({category}: {category: string}) => {

  const getOption = (category: string): Ioption => {
    switch (category) {
      case "love":
        return {
          color: "pink",
          icon: "fas fa-heart"
        }
      case "math":
        return {
          color: "failure",
          icon: "fas fa-infinity"
        }
      case "gaming":
        return {
          color: "info",
          icon: "fas fa-gamepad"
        }
      case "programming":
        return {
          color: "warning",
          icon: "fas fa-project-diagram"
        }
      default:
        return {
          color: "info",
          icon: ""
        }
    }
  }

  return <>
    <Badge className="w-fit" color={getOption(category).color}>
      <div className="text-center w-full p-1 flex gap-2">
        {getOption(category).icon && <i className={getOption(category).icon}></i>}
        <span className="capitalize">{category}</span>
      </div>
    </Badge>
  </>
}

export default Category;