import PublisherModel from "./publisher.model.js";
import pool from "../../db.js";

class PublisherService {
	static async getAllPublishers(db = pool) {
		try {
			const publishers = await PublisherModel.findAll(db);
			return { publishers };
		} catch (error) {
			console.error("Service Error in getAllPublishers:", error.message);
			throw error;
		}
	}

	static async getPublisherById(id, db = pool) {
		try {
			const publisher = await PublisherModel.findById(id, db);
			if (!publisher) throw new Error(`Publisher with ID ${id} not found`);
			return { publisher };
		} catch (error) {
			console.error("Service Error in getPublisherById:", error.message);
			throw error;
		}
	}

	static async createPublisher(name, description, db = pool) {
		try {
			const publisher = await PublisherModel.create(name, description, db);
			return { publisher, message: "Publisher created successfully" };
		} catch (error) {
			console.error("Service Error in createPublisher:", error.message);
			throw error;
		}
	}

	static async updatePublisher(id, name, description, db = pool) {
		try {
			const publisher = await PublisherModel.update(id, name, description, db);
			return { publisher, message: "Publisher updated successfully" };
		} catch (error) {
			console.error("Service Error in updatePublisher:", error.message);
			throw error;
		}
	}

	static async deletePublisher(id, db = pool) {
		try {
			const publisher = await PublisherModel.delete(id, db);
			return { publisher, message: `Publisher ${id} deleted successfully` };
		} catch (error) {
			console.error("Service Error in deletePublisher:", error.message);
			throw error;
		}
	}
}

export default PublisherService;
