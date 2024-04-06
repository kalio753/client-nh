import ExcelJS from "exceljs"
import { saveAs } from "filesaver.js"

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

export default async function generateExcel({ userName, header, data }) {
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
    const worksheet = workbook.addWorksheet(userName)
    const cols = ["A", "B", "C", "D", "E"]
    worksheet.getColumn("A").width = 8
    worksheet.getColumn("B").width = 80
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
    headerCell.value = header

    // Body - header
    const titleRow = [
        {
            cell: "A2",
            content: "STT",
            width: 20,
        },
        {
            cell: "B2",
            content: "NỘI DUNG",
            width: 20,
        },
        {
            cell: "C2",
            content: "ĐIỂM QUY ĐỊNH",
            width: 20,
        },
        {
            cell: "D2",
            content: "ĐIỂM TỰ CHẤM",
            width: 20,
        },
        {
            cell: "E2",
            content: "ĐIỂM TỔ CM",
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
    const sections = data.section
    let count = 3
    sections.forEach((section) => {
        // Add section Title
        const sectionTitleCell = worksheet.getCell(`B${count}`)
        sectionTitleCell.font = {
            name: "Times New Roman",
            size: 14,
            bold: true,
        }
        sectionTitleCell.alignment = {
            wrapText: true,
            vertical: "middle",
        }
        sectionTitleCell.value = section.title

        const sectionTotalCell = worksheet.getCell(`C${count}`)
        sectionTotalCell.font = {
            name: "Times New Roman",
            size: 14,
            bold: true,
        }
        sectionTotalCell.alignment = ALIGN_TOP_CENTER
        sectionTotalCell.value = section.total_point
        count++

        // Add criterias
        const criterias = section.content
        criterias.forEach((c, index) => {
            const sttCell = worksheet.getCell(`A${count}`)
            sttCell.alignment = {
                vertical: "bottom",
                horizontal: "center",
            }
            sttCell.value = index + 1

            const cirteriaCell = worksheet.getCell(`B${count}`)
            cirteriaCell.value = c.name

            const pointCell = worksheet.getCell(`C${count}`)
            pointCell.value = c.point
            pointCell.alignment = ALIGN_TOP_CENTER

            const selfPointCell = worksheet.getCell(`D${count}`)
            selfPointCell.value = c.self_point || ""
            selfPointCell.alignment = ALIGN_TOP_CENTER

            const supervisorPointCell = worksheet.getCell(`E${count}`)
            supervisorPointCell.value = c.self_point || ""
            supervisorPointCell.alignment = ALIGN_TOP_CENTER
            count++

            c.sub_criteria.forEach((sc) => {
                const subCirteriaCell = worksheet.getCell(`B${count}`)
                subCirteriaCell.value = `   + ${sc.name}`

                const sc_pointCell = worksheet.getCell(`C${count}`)
                sc_pointCell.value = sc.point
                sc_pointCell.alignment = ALIGN_TOP_CENTER

                const sc_selfPointCell = worksheet.getCell(`D${count}`)
                sc_selfPointCell.value = sc.self_point || ""
                sc_selfPointCell.alignment = ALIGN_TOP_CENTER

                const sc_supervisorPointCell = worksheet.getCell(`E${count}`)
                sc_supervisorPointCell.value = sc.self_point || ""
                sc_supervisorPointCell.alignment = ALIGN_TOP_CENTER
                count++
            })
        })
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

    const fileName = `${userName}.xlsx`

    workbook.xlsx.writeBuffer().then(function (data) {
        var blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
        saveAs(blob, fileName)
    })
}
