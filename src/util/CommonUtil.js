// ============================ Return selected meters in array ==============================
export const getSelectedRowIds = (selectionModel, rows) => {
  const allIds = rows.map((row) => row.id);

  if (Array.isArray(selectionModel)) {
    // If selection is an array, return it directly
    return selectionModel;
  }
  if (!selectionModel || !selectionModel.type) return [];
  const { type, ids } = selectionModel;
  if (type === "include") {
    if (!ids || ids.size === 0) {
      return [];
    } else {
      return Array.from(ids);
    }
  }

  if (type === "exclude") {
    if (!ids || ids.size === 0) {
      return allIds;
    } else {
      return allIds.filter((id) => !ids.has(id));
    }
  }

  return [];
};

// ========================================================== DATE FORMATTER =================================================
export const dateFormatter = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

// =========================================================== MONTHLY DATA FORMATTER =============================================
export const transformMonthlyData = (inputData) => {
  const monthNames = {
    "01": "jan",
    "02": "feb",
    "03": "mar",
    "04": "apr",
    "05": "may",
    "06": "jun",
    "07": "july",
    "08": "aug",
    "09": "sept",
    10: "oct",
    11: "nov",
    12: "dec",
  };

  const monthsArray = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "july",
    "aug",
    "sept",
    "oct",
    "nov",
    "dec",
  ];

  // Create a map of existing data
  const dataMap = inputData.reduce((acc, item) => {
    const monthName = monthNames[item.month];
    if (monthName) {
      acc[monthName] = item.totalPayment;
    }
    return acc;
  }, {});

  // Generate result array
  return monthsArray.map((month) => ({
    name: month,
    amount: dataMap[month] || 0,
  }));
}
