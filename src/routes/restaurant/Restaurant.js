import * as React from "react"
import {Button, Card} from "react-bootstrap"
import {useParams} from "react-router-dom"

function Restaurant(props) {
  const {restaurantDATA} = props
  let {name} = useParams()
  const [restaurant, setRestaurant] = React.useState()
  React.useEffect(() => {
    const tempRestaurant = restaurantDATA.restaurants.find(restaurant => {
      if (restaurant.name === name) return true
      return false
    })
    setRestaurant(tempRestaurant)
  }, [name, restaurantDATA.restaurants])
  let lastCategory

  return (
    <div>
      {restaurant && (
        <>
          <div className="text-center">
            <h2>{restaurant.name}</h2>
            <h4>{restaurant.description}</h4>
          </div>
          <div className="mt-5">
            {restaurant.menus
              .sort((menu, menu2) => {
                const x = menu.category.toLowerCase()
                const y = menu2.category.toLowerCase()
                if (x < y) {
                  return 1
                }
                if (x > y) {
                  return -1
                }
                return 0
              })
              .map(menu => {
                let isNewCategory = false
                if (lastCategory !== menu.category) {
                  isNewCategory = true
                  lastCategory = menu.category
                }
                return (
                  <MenuItem
                    key={menu.id}
                    menu={menu}
                    isNewCategory={isNewCategory}
                  />
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}

function MenuItem(props) {
  const {isNewCategory, menu} = props
  const [itemCount, setItemCount] = React.useState(1)
  const isCountOne = itemCount === 1

  const increment = () => setItemCount(itemCount + 1)
  const decriment = () => setItemCount(itemCount - 1)

  function generateCardBody() {
    return (
      <Card.Body>
        <Card.Title>{menu.itemName}</Card.Title>
        <Card.Text>{menu.description}</Card.Text>
        <div className="d-flex">
          <Button
            style={{borderRadius: 0}}
            variant="outline-secondary"
            disabled={isCountOne}
            onClick={decriment}>
            -
          </Button>
          <Button
            style={{borderRadius: 0}}
            disabled
            className="px-3"
            variant="outline-secondary">
            {itemCount}
          </Button>
          <Button
            style={{borderRadius: 0}}
            variant="outline-secondary"
            onClick={increment}>
            +
          </Button>
          <Button className="ml-3 w-50" variant="secondary">
            {menu.price * itemCount}, - €
          </Button>
        </div>
      </Card.Body>
    )
  }

  if (isNewCategory) {
    return (
      <>
        <div className="bg-light py-2">
          {" "}
          <h3 className="pl-3 mt-1">
            <strong>{menu.category}</strong>
          </h3>{" "}
        </div>
        <Card className="my-2">{generateCardBody()}</Card>
      </>
    )
  } else {
    return <Card className="my-2">{generateCardBody()}</Card>
  }
}

export default Restaurant
