var tabela
var pontuacao = 0
var linhas = 4
var colunas = 4

window.onload = function() {
    setGame()
}

function setGame() {
    tabela = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < linhas; r++) {
        for (let c = 0 ;c < colunas; c++) {
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            let num = tabela[r][c]
            updateTile(tile, num)
            document.getElementById("tabela").append(tile)
        }
    }

    setTwo()
}

function updateTile(tile, num) {
    tile.innerText = ""
    tile.classList.value = ""
    tile.classList.add("tile")
    if (num > 0) {
        tile.innerText = num.toString()
        if (num <= 4096) {
            tile.classList.add("x"+num.toString())
        } else {
            tile.classList.add("x8192")
        }                
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft()
        setTwo()
    }
    else if (e.code == "ArrowRight") {
        slideRight()
        setTwo()
    }
    else if (e.code == "ArrowUp") {
        slideUp()
        setTwo()

    }
    else if (e.code == "ArrowDown") {
        slideDown()
        setTwo()
    }
    document.getElementById("pontuacao").innerText = pontuacao
})

function filterZero(row){
    return row.filter(num => num != 0)
}

function slide(row) {
    row = filterZero(row)
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2
            row[i+1] = 0
            pontuacao += row[i]
        }
    }
    row = filterZero(row)
    while (row.length < colunas) {
        row.push(0)
    }
    return row
}

function slideLeft() {
    for (let r = 0; r < linhas; r++) {
        let row = tabela[r]
        row = slide(row)
        tabela[r] = row
        for (let c = 0; c < colunas; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = tabela[r][c]
            updateTile(tile, num)
        }
    }
}

function slideRight() {
    for (let r = 0; r < linhas; r++) {
        let row = tabela[r]
        row.reverse()
        row = slide(row)
        tabela[r] = row.reverse()
        for (let c = 0; c < colunas; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = tabela[r][c]
            updateTile(tile, num)
        }
    }
}

function slideUp() {
    for (let c = 0; c < colunas; c++) {
        let row = [tabela[0][c], tabela[1][c], tabela[2][c], tabela[3][c]]
        row = slide(row)
        for (let r = 0; r < linhas; r++){
            tabela[r][c] = row[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = tabela[r][c]
            updateTile(tile, num)
        }
    }
}

function slideDown() {
    for (let c = 0; c < colunas; c++) {
        let row = [tabela[0][c], tabela[1][c], tabela[2][c], tabela[3][c]]
        row.reverse()
        row = slide(row)
        row.reverse()
        for (let r = 0; r < linhas; r++){
            tabela[r][c] = row[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = tabela[r][c]
            updateTile(tile, num)
        }
    }
}

function setTwo() {
    if (!hasQuadradoVazio()) {
        return
    }
    let found = false
    while (!found) {
        let r = Math.floor(Math.random() * linhas)
        let c = Math.floor(Math.random() * colunas)
        if (tabela[r][c] == 0) {
            tabela[r][c] = 2
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            tile.innerText = "2"
            tile.classList.add("x2")
            found = true
        }
    }
}

function hasQuadradoVazio() {
    let count = 0
    for (let r = 0; r < linhas; r++) {
        for (let c = 0; c < colunas; c++) {
            if (tabela[r][c] == 0) {
                return true
            }
        }
    }
    return false
}