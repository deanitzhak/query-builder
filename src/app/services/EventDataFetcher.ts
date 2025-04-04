// src/services/EventDataFetcher.ts
import { IEventDataFetcher, IExtendedEvent } from "../../types/interfaces/events/IEvents";

// Mock data for demonstration purposes
const mockEvents: IExtendedEvent[] = [
  {
    id: 1,
    department: "תיאטרון",
    name: "המלך ליר",
    date: "12/05/2025",
    hall: "אולם ראשי",
    forSale: 200,
    sold: 120,
    reserved: 30,
    available: 50,
    status: "פעיל",
    price: 120,
    duration: "120 דקות"
  },
  {
    id: 2,
    department: "מוזיקה",
    name: "מופע ג'אז",
    date: "15/05/2025",
    hall: "אולם קטן",
    forSale: 100,
    sold: 65,
    reserved: 15,
    available: 20,
    status: "פעיל",
    price: 90,
    duration: "90 דקות"
  },
  {
    id: 3,
    department: "הרצאות",
    name: "חדשנות בעידן הדיגיטלי",
    date: "20/05/2025",
    hall: "אולם הרצאות",
    forSale: 150,
    sold: 90,
    reserved: 25,
    available: 35,
    status: "פעיל",
    price: 60,
    duration: "75 דקות"
  },
  {
    id: 4,
    department: "ילדים",
    name: "הצגת ילדים - הענק והגמד",
    date: "25/05/2025",
    hall: "אולם משפחה",
    forSale: 180,
    sold: 160,
    reserved: 10,
    available: 10,
    status: "כמעט אזל",
    price: 80,
    duration: "60 דקות"
  },
  {
    id: 5,
    department: "מחול",
    name: "מופע בלט קלאסי",
    date: "01/06/2025",
    hall: "אולם ראשי",
    forSale: 200,
    sold: 100,
    reserved: 20,
    available: 80,
    status: "פעיל",
    price: 150,
    duration: "140 דקות"
  },
  {
    id: 6,
    department: "קולנוע",
    name: "הקרנת בכורה - סרט ישראלי חדש",
    date: "05/06/2025",
    hall: "אולם קולנוע",
    forSale: 120,
    sold: 85,
    reserved: 10,
    available: 25,
    status: "פעיל",
    price: 50,
    duration: "110 דקות"
  },
  {
    id: 7,
    department: "סטנדאפ",
    name: "ערב קומדיה",
    date: "10/06/2025",
    hall: "אולם קטן",
    forSale: 100,
    sold: 98,
    reserved: 2,
    available: 0,
    status: "אזל",
    price: 100,
    duration: "90 דקות"
  }
];

// Implementation of the IEventDataFetcher interface
class EventDataFetcher implements IEventDataFetcher {
  // Simulating API call with delay
  private simulateApiCall<T>(data: T, delay = 500): Promise<T> {
    return new Promise(resolve => {
      setTimeout(() => resolve(data), delay);
    });
  }

  /**
   * Fetch events with optional filtering parameters
   */
  async fetchEvents(params?: any): Promise<IExtendedEvent[]> {
    // In a real implementation, this would make an API call with the params
    // For now, we'll simulate filtering based on department if provided
    let filteredEvents = [...mockEvents];
    
    if (params?.department) {
      filteredEvents = filteredEvents.filter(event => 
        event.department.includes(params.department)
      );
    }
    
    if (params?.dateFrom) {
      // Very basic date filtering (in a real app, use proper date objects)
      filteredEvents = filteredEvents.filter(event => 
        event.date >= params.dateFrom
      );
    }
    
    return this.simulateApiCall(filteredEvents);
  }

  /**
   * Fetch a single event by ID
   */
  async fetchEventById(id: number): Promise<IExtendedEvent | null> {
    const event = mockEvents.find(event => event.id === id) || null;
    return this.simulateApiCall(event);
  }

  /**
   * Enhanced search events method with support for operators
   */
  async searchEvents(query: string, params?: any): Promise<IExtendedEvent[]> {
    // If no query and no params, return all events
    if (!query && (!params || Object.keys(params).length === 0)) {
      return this.fetchEvents();
    }
    
    let filteredEvents = [...mockEvents];
    
    // Handle specific field and operator searches
    if (params?.field) {
      const fieldName = params.field;
      const operator = params.operator || 'contains';
      const searchValue = params.value;
      const isNegated = params.negated === true;
      
      filteredEvents = filteredEvents.filter(event => {
        const fieldValue = event[fieldName];
        let matches = false;
        
        switch (operator) {
          case 'equals':
            matches = String(fieldValue) === String(searchValue);
            break;
          case 'notEquals':
            matches = String(fieldValue) !== String(searchValue);
            break;
          case 'contains':
            matches = String(fieldValue).toLowerCase().includes(String(searchValue).toLowerCase());
            break;
          case 'startsWith':
            matches = String(fieldValue).toLowerCase().startsWith(String(searchValue).toLowerCase());
            break;
          case 'endsWith':
            matches = String(fieldValue).toLowerCase().endsWith(String(searchValue).toLowerCase());
            break;
          case 'greaterThan':
            matches = Number(fieldValue) > Number(searchValue);
            break;
          case 'lessThan':
            matches = Number(fieldValue) < Number(searchValue);
            break;
          case 'between':
            if (Array.isArray(searchValue) && searchValue.length === 2) {
              // For dates, we might need special comparison
              if (fieldName === 'date') {
                // Simple string comparison for dates in format DD/MM/YYYY
                matches = String(fieldValue) >= String(searchValue[0]) && 
                         String(fieldValue) <= String(searchValue[1]);
              } else {
                matches = Number(fieldValue) >= Number(searchValue[0]) && 
                         Number(fieldValue) <= Number(searchValue[1]);
              }
            }
            break;
          case 'in':
            if (Array.isArray(searchValue)) {
              matches = searchValue.some(val => String(val) === String(fieldValue));
            }
            break;
          case 'notIn':
            if (Array.isArray(searchValue)) {
              matches = !searchValue.some(val => String(val) === String(fieldValue));
            }
            break;
          default:
            matches = true;
        }
        
        // Apply negation if needed
        return isNegated ? !matches : matches;
      });
      
      return this.simulateApiCall(filteredEvents);
    }
    
    // Handle complex queries (not implemented in this demo)
    if (params?.complexQuery) {
      console.log('Complex query:', params.complexQuery);
      // In a real implementation, you would process the entire query tree
      return this.simulateApiCall(filteredEvents.slice(0, 3)); // Return first 3 events as demo
    }
    
    // Simple text search as fallback
    if (query) {
      const normalizedQuery = String(query).toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.name.toLowerCase().includes(normalizedQuery) ||
        event.department.toLowerCase().includes(normalizedQuery) ||
        event.hall.toLowerCase().includes(normalizedQuery)
      );
    }
    
    return this.simulateApiCall(filteredEvents);
  }
}

export default EventDataFetcher;