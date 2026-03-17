export default function handler(req, res) {

const deadlock = true

res.status(200).json({
message: "Deadlock detected",
cycle: ["P1","R1","P2","R2"]
})

}