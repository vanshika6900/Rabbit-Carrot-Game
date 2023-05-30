<!-- GETTING STARTED WITH THE PROJECT -->

<!-- OVERVIEW -->

I have made a cartoon theme where to help rabbit to get the carrot you need to place the numbers correctly in the basket in ascending order. If your answer is correct then rabbit will get the carrot otherwise not.

<!-- TECH STACK -->

Here I have used reactJs, HTML, CSS.

<!-- NPM PACKAGES: -->
<!-- Swal:  -->

For showing a sweet alert.

<!-- React-Router-Dom: -->

To navigate from one page to another.

<!-- DEEP UNDERSTANDING OF PROJECT: -->

Firstly I am generating 5 random numbers using Math.random and storing it into an array usestate named as "numbers"

I have used two usestate arrays. One is "numbers" which is storing all the random numbers which we are generating and the second one is "sortedNumbers" which is storing the numbers that have been placed in the basket.

So when the user starts dragging the number the function "handleDragStart" is invoked.

<!-- "handleDragStart"  EXPLAINED -->

It is handling the drag operation. It takes the event e, the number being dragged as parameters and transferrs the data as the number is dragged. This data will be accessed in the handleDrop function when the number is dropped.

<!-- Then we have handleDragOver function: -->

This function is triggered when a dragged item is being dragged over a valid drop target. 'e.preventDefault()' is called to prevent the default browser behavior for the drag operation.By default, HTML elements do not allow dropping. The onDragOver event is required to enable dropping by canceling the default behavior.

<!-- handleDrop EXPLAINED -->

When the number is dropped into one of the baskets handleDrop function is triggered.

1. To prevent the default browser behavior for the drop event e.preventDefault() is called

2. To get the dropped number from the data transfer object,we are using const droppedNumber = parseInt(e.dataTransfer.getData('text/plain'), 10)

3. To create a copy of the sortedNumbers array we are using const updatedSortedNumbers = [...sortedNumbers]

4. (updatedSortedNumbers.includes(droppedNumber)) checks if the dropped number already exists in the updatedSortedNumbers array. If it does, the function returns early to prevent duplicates.

5. const draggedNumberIndex = numbers.indexOf(droppedNumber) finds the index of the dropped number in the numbers array.

6. If the draggedNumberIndex is not -1 (indicating that the number was found in the numbers array), it means the number was dragged from the first div. In this case:

7. const updatedNumbers = [...numbers] creates a copy of the numbers array.
   updatedNumbers.splice(draggedNumberIndex, 1) removes the dropped number from the updatedNumbers array.
   setNumbers(updatedNumbers) updates the state with the new numbers array, removing the dropped number from the first div.
8. updatedSortedNumbers.splice(index, 0, droppedNumber) inserts the dropped number at the specified index in the updatedSortedNumbers array.

9. setSortedNumbers(updatedSortedNumbers) updates the state with the new sorted numbers array.

10. If the length of the updatedSortedNumbers array is equal to 5 setShowResult becomes true means the 'CHECK ANSWER' button appears and if isAscendingOrder returns true then the 'answer' state storing the result becomes true else it is false.

<!-- 'CHECK ANSWER' BUTTON FUNCTIONALITY -->

On clicking on 'CHECK ANSWER' we navigate to next page using useNavigate where we are sending answer state to display the answer. Also when we click on the button if the answer is true then the message 'Yayy! Correct Answer. Rabbit got the carrot' else the message 'Oops! Wrong Answer. Rabbit did not got the carrot' will be read out.

<!-- RESULT PAGE  -->

On next page we are taking the answer using useLocation and if location.state.answer is false then 'Oops! Wrong Answer. Rabbit did not got the carrot' will appear with a 'TRY AGAIN' button to retry with other random values else 'Yayy! Correct Answer. Rabbit got the carrot' will appear with a 'RESET' button to reset the game and play agian.
