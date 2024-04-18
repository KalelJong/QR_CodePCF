import * as ReactDOM from "react-dom";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import ScanQR from "./Components/ScanQR";
import * as React from "react";
import Button from "./Components/Button";
export class QRCodePCF
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private notifyOutputChanged: () => void;
  private container: HTMLDivElement;
  private context: ComponentFramework.Context<IInputs>;
  private firstname: string;
  private lastName: string;
  private jobTitle: string;
  private tel: string;
  private street: string;
  private city: string;
  private account: string;
  private details: string;
  private url: string;
  private postalcode: string;

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;
    this.container = container;
    this.context = context;
    this.setOutputs({} as IOutputs);

    ReactDOM.render(
      React.createElement(Button, { setOutputs: this.setOutputs.bind(this) }),
      this.container
    );
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    ReactDOM.render(
      React.createElement(Button, { setOutputs: this.setOutputs.bind(this) }),
      this.container
    );
  }

  private setOutputs(outputs: IOutputs): void {
    this.firstname = outputs.firstname || "";
    this.lastName = outputs.lastName || "";
    this.jobTitle = outputs.jobTitle || "";
    this.tel = outputs.tel || "";
    this.street = outputs.street || "";
    this.city = outputs.city || "";
    this.postalcode = outputs.postalcode || "";
    this.account = outputs.account || "";
    this.details = outputs.details || "";
    this.url = outputs.url || "";
    this.notifyOutputChanged();
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    return {
      firstname: this.firstname,
      lastName: this.lastName,
      jobTitle: this.jobTitle,
      tel: this.tel,
      street: this.street,
      city: this.city,
      account: this.account,
      details: this.details,
      postalcode: this.postalcode,
      url: this.url,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
