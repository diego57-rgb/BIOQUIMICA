function createMolecule(){
    const cantidad = 100;

    for (let i in dataJson){
        for (let j = 0; j < cantidad; j++){
            let atom = {
                position: {
                posX: Math.random() * innerWidth,
                posY: Math.random() * innerHeight
                },
                width: pixW,
                height: pixW,
                velX: 0,
                velY: 0,
                color: "",
                name: "atom",
                charge: Math.floor(Math.random() * 3) - 1, 
                active: false,
                force: 0,
            }
            if(atom.charge > 0){
                atom.color = "red"
            }else if(atom.charge < 0){
                atom.color = "green"
            }

            dataJson[i].atoms.push(atom)
        }
    }
}
createMolecule()
