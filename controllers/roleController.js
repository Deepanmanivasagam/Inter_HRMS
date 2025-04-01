const Role = require('../model/role');

const createRole = async (req, res) => {
    try {
        const {role,description} = req.body;

        const newRole = new Role({ role, description });
        await newRole.save();

        res.status(201).json({ message: "Role created successfully", role: newRole });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({ isActive: true })
        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getRoleById = async (req, res) => {
    try {
        const { id } = req.body;
        const role = await Role.findById(id);

        if (!role || !role.isActive) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.status(200).json({ role });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role,description,isActive} = req.body;
        
        if(!id){
            return res.status(404).json("Invalid Id");
        }
        const updatedRole = await Role.findByIdAndUpdate(
            id,
            {role,
             description,
             isActive,
            },
            { new: true }
        );
        if (!updatedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json({ message: "Role updated successfully", role: updatedRole });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteRole = async (req, res) => {
    try{
        const { id } = req.body;
        const deletedRole = await Role.findByIdAndUpdate(id);
        if(!deletedRole){
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json({message:"Role deleted successfully",role:deletedRole});
    }catch(error){
        res.status(500).json({message:"Server error",error: error.message});
    }
};

module.exports = {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole
};