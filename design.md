## Model
The interpreter and its components.

### Data structures:
#### Input buffer
Stores input from the user in a form accessible to the parser.

#### AST
Tree structured data containing values and methods for evaluating expressions.

### Components
#### Parser
Determines the correct AST described by the expression in the input  buffer.

#### Evaluator
Methods built-in to the AST to evaluate the result of expressions.

## View
Displays of the current status of the calculator.

### Screens
#### Input screen
Top screen, contains the expression being entered by the user. Remains on 
screen after the user evaluates the expression but is erased on any new input
after and evaluation.

#### Output screen
Contains the output of the most recently evaluated expression. Reset for each
new evaluation.

## Controller
### Keyboard
#### Buttons
Each button has a brief symbolic description of its purpose, matched to the
symbol that will display on the screen when the button is pressed. Some buttons
also have a secondary function activated by first pressing the "2nd" button, 
the symbol for this is in the upper left corner of the button.

Each button has a hidden plain text representation of its meaning, which will
be added to the input buffer when the button is pressed. Secondary functions
will also have such hidden plain text representation.