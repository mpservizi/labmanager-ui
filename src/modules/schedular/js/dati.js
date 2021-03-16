export const roomTypes = [
  { value: "1", label: "1 bed" },
  { value: "2", label: "2 beds" },
  { value: "3", label: "3 beds" },
  { value: "4", label: "4 beds" }
];
export const roomStatuses = [
  { value: "1", label: "Ready" },
  { value: "2", label: "Dirty" },
  { value: "3", label: "Clean up" }
];
export const bookingStatuses = [
  { value: "1", label: "New" },
  { value: "2", label: "Confirmed" },
  { value: "3", label: "Arrived" },
  { value: "4", label: "Checked Out" }
];

export const rooms = [
  { value: "1", label: "101", type: "1", status: "1" },
  { value: "2", label: "102", type: "1", status: "3" },
  { value: "3", label: "103", type: "1", status: "2" },
  { value: "4", label: "104", type: "1", status: "1" },
  { value: "5", label: "105", type: "2", status: "1" },
  { value: "6", label: "201", type: "2", status: "2" },
  { value: "7", label: "202", type: "2", status: "1" },
  { value: "8", label: "203", type: "3", status: "3" },
  { value: "9", label: "204", type: "3", status: "3" },
  { value: "10", label: "301", type: "4", status: "2" },
  { value: "11", label: "302", type: "4", status: "2" }
];

const data = [
  {
    room: "1",
    start_date: "2017-03-02",
    end_date: "2017-03-23",
    text: "A-12",
    id: "1",
    status: "1",
    is_paid: "1"
  },
  {
    room: "3",
    start_date: "2017-03-07",
    end_date: "2017-03-21",
    text: "A-45",
    id: "2",
    status: "2",
    is_paid: "1"
  },
  {
    room: "5",
    start_date: "2017-03-06",
    end_date: "2017-03-14",
    text: "A-58",
    id: "3",
    status: "3",
    is_paid: "0"
  },
  {
    room: "7",
    start_date: "2017-03-04",
    end_date: "2017-03-18",
    text: "A-28",
    id: "4",
    status: "4",
    is_paid: "0"
  }
];

export function getDati() {
  let result = {
    data: [],
    collections: {}
  };

  result.data = data;
  result.collections["roomTypes"] = roomTypes;
  result.collections["roomStatuses"] = roomStatuses;
  result.collections["bookingStatuses"] = bookingStatuses;
  result.collections["rooms"] = rooms;
  return result;
}
