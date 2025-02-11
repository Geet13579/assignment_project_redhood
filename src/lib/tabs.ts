  

  type Group = {
    label:string,
    active:boolean,
    value: string, // Add a new property to store the value of the tab label
 
  };


  export function getTabList(): Group[] {
    return [
        { label: "Add Booking", active: true, value:"SERVICE" },
        { label: "Chauffeur", active: true, value:"CHAUFFEUR" },
        { label: "RSA", active: true, value:"RSA" },
        { label: "Upcoming Booking", active: true, value:"Upcoming Booking" }
    
    ]}