import { Button, ButtonGroup, IconButton } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Pagination = (props) => {
  const lastPage = props.numberOfPages - 1
  const currentPage = props.currentPage

  console.log(currentPage)
  console.log(lastPage)

  const pagesButtons = (currentPage) => {
    const buttons = []
    if (currentPage === 0) {
      for (
        let index = currentPage;
        index <= lastPage && index <= currentPage + 2;
        index++
      ) {
        buttons.push(index + 1)
      }

      return buttons
    } else if (currentPage === lastPage) {
      for (
        let index = currentPage;
        index >= 0 && index >= currentPage - 2;
        index--
      ) {
        buttons.push(index + 1)
      }
      return buttons.reverse()
    } else {
      return [currentPage, currentPage + 1, currentPage + 2]
    }
  }
  return (
    <ButtonGroup>
      <IconButton
        isDisabled={currentPage === 0}
        onClick={() => props.handleClick(0)}
        id="first"
        icon={<FontAwesomeIcon icon="angle-double-left" className="mr-3" />}
      ></IconButton>
      <IconButton
        isDisabled={currentPage === 0}
        onClick={() => props.handleClick(currentPage - 1)}
        id="previous"
        icon={<FontAwesomeIcon icon="angle-left" className="mr-3" />}
      ></IconButton>
      {pagesButtons(currentPage).map((pageNumber, key) => {
        return (
          <Button
            key={key}
            colorScheme={pageNumber === currentPage + 1 ? 'teal' : 'gray'}
            onClick={() => props.handleClick(pageNumber - 1)}
          >
            {pageNumber}
          </Button>
        )
      })}
      <IconButton
        onClick={() => props.handleClick(currentPage + 1)}
        isDisabled={currentPage === lastPage}
        id="next"
        icon={<FontAwesomeIcon icon="angle-right" className="mr-3" />}
      ></IconButton>
      <IconButton
        isDisabled={currentPage === lastPage}
        onClick={() => props.handleClick(lastPage)}
        id="last"
        icon={<FontAwesomeIcon icon="angle-double-right" className="mr-3" />}
      ></IconButton>
    </ButtonGroup>
  )
}
