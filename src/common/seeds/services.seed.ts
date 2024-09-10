import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "src/services/entities/service.entity";
import { Repository } from "typeorm";


@Injectable()
export class ServiceSeeder {
  constructor(
    @InjectRepository (Service) private readonly serviceRepository: Repository<Service>
  ) {}

  async seed() {
    const services = [
      {
        name: 'Consulta general',
        price: 50000,
        collaborators: []
      },
      {
        name: 'radiografia',
        price: 100000,
        collaborators: []
      },
      {
        name: 'Ecografia',
        price: 150000,
        collaborators: []
      },
      {
        name: 'Baño',
        price: 43000,
        collaborators: []
      },
      {
        name: 'Consulta especialista',
        price: 150000,
        collaborators: []
      },
      {
        name: 'Toma de muestras',
        price: 50000,
        collaborators: []
      },
    ];

    for (const service of services) {
      const serviceExists = await this.serviceRepository.findOneBy({name: service.name});
      if (!serviceExists) {
        const newService = this.serviceRepository.create(service);
        await this.serviceRepository.save(newService);
        console.log(`Shift ${service.name} created`);
      } else {
        // console.log(`Shift ${shift.name} already exists`);
      }
    }
  }
}