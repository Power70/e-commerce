import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    // Create a new Role entity
   const role = new Role();
   Object.assign(role, createRoleDto);
    // Save the role to the database
   return this.roleRepository.save(role);
  }

  async getRole(name: string) {
    // Find a role by its name
    const role = await this.roleRepository.findOne({ 
      where: { name, isActive: true }, // Only active roles
      // Optionally include relations like users
      relations: { users: true }, // Include users if needed
    });
    if (!role)  throw new NotFoundException(`Role with name ${name} not found`);

    return role;
  }

  async findAll() {
    const roles = await this.roleRepository.find({
      where: { isActive: true }, // Only active roles
    });

    return roles;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(name: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.getRole(name);
    // Update the role with new data
    role.description = updateRoleDto.description ?? role.description;
    // Save the updated role to the database
    return this.roleRepository.save(role);
  }

  async remove(name: string) {
    const role = await this.getRole(name);
    if (role.users?.length > 0) {
      throw new BadRequestException(`Cannot delete role with name ${name}.`);
    }
    // Remove the role from the database
    role.isActive = false; // Soft delete
    await this.roleRepository.save(role);
  }
}
