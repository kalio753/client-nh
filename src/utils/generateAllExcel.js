import ExcelJS from "exceljs"
import { saveAs } from "filesaver.js"
import checkRank from "./checkRank"

const ALIGN_TOP_CENTER = {
    wrapText: true,
    vertical: "top",
    horizontal: "center",
}

const BORDER_ROUND = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
}

export default async function generateAlllExcel({ data }) {
    const workbook = new ExcelJS.Workbook()
    workbook.views = [
        {
            x: 0,
            y: 0,
            width: 10000,
            height: 20000,
            firstSheet: 0,
            activeTab: 1,
            visibility: "visible",
        },
    ]

    // Sheet config
    const worksheet = workbook.addWorksheet("Sheet 1")
    const cols = ["A", "B", "C", "D", "E"]
    worksheet.getColumn("A").width = 30
    worksheet.getColumn("B").width = 20
    worksheet.getColumn("C").width = 10
    worksheet.getColumn("D").width = 10
    worksheet.getColumn("E").width = 10
    cols.forEach(
        (c) =>
            (worksheet.getColumn(c).style = {
                font: {
                    name: "Times New Roman",
                    size: 12,
                },
                alignment: {
                    wrapText: true,
                    vertical: "middle",
                },
            }),
    )

    // Header
    worksheet.mergeCells("A1:E1")
    const headerCell = worksheet.getCell("A1")
    headerCell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
    }
    headerCell.font = {
        name: "Times New Roman",
        size: 16,
        bold: true,
    }
    headerCell.value = "Điểm tổng kết"

    // Body - header
    const titleRow = [
        {
            cell: "A2",
            content: "Tên giáo viên",
            width: 20,
        },
        {
            cell: "B2",
            content: "Phòng ban",
            width: 20,
        },
        {
            cell: "C2",
            content: "Điểm tự chấm",
            width: 20,
        },
        {
            cell: "D2",
            content: "Điểm tổ CM",
            width: 20,
        },
        {
            cell: "E2",
            content: "Xếp loại dự kiến",
            width: 20,
        },
    ]

    titleRow.forEach((row) => {
        const titleCell = worksheet.getCell(row.cell)
        titleCell.font = {
            name: "Times New Roman",
            size: 12,
            bold: true,
        }
        titleCell.alignment = {
            wrapText: true,
            vertical: "middle",
            horizontal: "center",
        }

        titleCell.value = row.content
    })

    // Body - content
    let count = 3
    data.forEach((item) => {
        const nameCell = worksheet.getCell(`A${count}`)
        nameCell.value = item.user_name

        const deptCell = worksheet.getCell(`B${count}`)
        deptCell.value = item.dept_name

        const selfPointCell = worksheet.getCell(`C${count}`)
        selfPointCell.value = item.total_self_point || ""
        selfPointCell.alignment = ALIGN_TOP_CENTER

        const supervisorPointCell = worksheet.getCell(`D${count}`)
        supervisorPointCell.value = item.total_supervisor_point || ""
        supervisorPointCell.alignment = ALIGN_TOP_CENTER

        const rankCell = worksheet.getCell(`E${count}`)
        rankCell.value = item.total_supervisor_point
            ? checkRank(item.total_supervisor_point)
            : checkRank(item.total_self_point)
        rankCell.alignment = ALIGN_TOP_CENTER

        count++
    })

    for (let rowNumber = 1; rowNumber <= worksheet.rowCount; rowNumber++) {
        for (
            let colNumber = 1;
            colNumber <= worksheet.columnCount;
            colNumber++
        ) {
            worksheet.getCell(rowNumber, colNumber).border = BORDER_ROUND
        }
    }

    workbook.xlsx.writeBuffer().then(function (data) {
        var blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
        saveAs(blob, "Diem_tong_ket.xlsx")
    })
}
