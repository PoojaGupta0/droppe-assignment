### `Updated directory structure`

It helps devloper/user to find what they need quickly and with confidence. it's also minimize the access time.

### `Implemented routing`

Routing plays an important role to display multiple views/pages in a single page application. without routing we are not able to create more page in reactJs.

### `Conversion of component from class to functional`

* Functional components show a greater performance than class components.
* Functional components are stateless, there are no lifecycle methods or state management.
* The syntax is less complex than that of class components.
* They don’t have access to methods like `shouldComponentUpdate` and `PureComponent`, it could be a bit of an inconvenience to optimize them for performance

### `Typescript minor improvements`

* The HTMLFormElement interface represents a <form> element in the DOM
* FormEvent is occurs whenever a form or form element gets/loses focus, a form element value is changed or the form is submitted.

### `Refactored shopApp component`

* Removed `for` loop because we can directly set array of object in state and `for` loop also decrease performance.
* Changed variable name for uniquely/easily identify.

### `Created component for modal`

* We can make code readable by creating seperate component. It also reduce complexity of code and make it understandable.

### `Refactored productDetails component`

* Replaced `strong` tag with `b` tag beacuse for bold we use `b` tag but when we require extra importance with bold for text then we should use `strong` tag. 
* Removed `!` operator which is used 4 times as it's equal to true. So we don't need to use `!` 4 times to make any condition true.

### `Refactored form component`
 
* For remove duplicacy, I replaced multiple `input` & `span` tag with map function iteration. 

### `Removed inline css`

* Makes maintenance easy.
* Lack of writing media queries.
* Some older devices are not able to access inline css.
* Inline styles make your pages bigger.
* Lack of reusability.
* Inability to use css selectors.

### `Fixed indentation`

* Indentation makes code readable.

### `Defined type as global`

* Make type/interface reusable.
* Reduce lines of code as we don't need to define same piece of code in diffrent files.
* Easily accessible in any file.

### `Minor improvements`

* Replaced `span` with `label` as span and label tags are quite the same, except that label tags are specific for giving a name to input tags.
* Removed `lodash.reverse` because it's not a good practice to use any library unnecessary as we can replace `lodash.reverse` with javascript `reverse` function.

### `Removed lodash library`

* I checked in the application the usage of lodash function and replaced them by JS functions.
* So as per the performance or optimization I decided to remove this library.
