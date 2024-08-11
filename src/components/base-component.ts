namespace App {
  // Component Base Class, for user interface
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = <HTMLTemplateElement>(
        (document.getElementById(templateId)! as HTMLTemplateElement)
      );
      this.hostElement = document.getElementById(hostElementId) as T;

      const importednode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importednode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }

      this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtBeginning ? "afterbegin" : "beforeend",
        this.element
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }
}
