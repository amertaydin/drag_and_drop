import { Autobind as autobind } from "../decorators/autobind"; // use alias
import { projectState } from "../state/project-state";
import * as Validation from "../util/validation"; // grouping
import { Component } from "./base-component";

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputEelement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    // We make sure getElementById won't return null and it'll return templateElement
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInputEelement = <HTMLInputElement>(
      this.element.querySelector("#people")
    );

    this.configure();
  }

  private gatherUserInput(): [string, string, number] | void {
    // we might return nothing or a tuple
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputEelement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
    ) {
      alert("Invalid input, Please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputEelement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userinput = this.gatherUserInput();
    if (Array.isArray(userinput)) {
      // if returns true it means we get the tuple
      const [title, desc, people] = userinput; // destructing the userInput
      projectState.addProject(title, desc, people);
      this.clearInputs(); // Clear the input fields
    }
  }
}
