import { getRecetas, getRecetaById } from './controller.receta'; // Adjust path as needed
import Receta from '../models/Receta'; // Adjust path as needed

jest.mock('../models/Receta'); // Mock the Receta model

describe('getRecetas', () => {
    it('should return a list of populated recipes', async () => {
        // Arrange
        const mockRecetas = [
            { nombre: 'Recipe 1', ingredients: [{ ingredient: { nombre: 'Ingredient 1' } }] },
            { nombre: 'Recipe 2', ingredients: [{ ingredient: { nombre: 'Ingredient 2' } }] },
        ];
        Receta.find.mockResolvedValue({ populate: jest.fn().mockResolvedValue(mockRecetas) });
        const req = {};
        const res = {
            json: jest.fn(),
        };

        // Act
        await getRecetas(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(mockRecetas);
    });

    it('should return a 500 error if something goes wrong', async () => {
        // Arrange
        const errorMessage = 'Database error';
        Receta.find.mockRejectedValue(new Error(errorMessage));
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Act
        await getRecetas(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('should return an empty array if no recipes are found', async () => {
        // Arrange
        Receta.find.mockResolvedValue({ populate: jest.fn().mockResolvedValue([]) });
        const req = {};
        const res = {
            json: jest.fn(),
        };

        // Act
        await getRecetas(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith([]);
    });
});

jest.mock('../models/Receta'); // Mock the Receta model

describe('getRecetaById', () => {
    it('should return a recipe by ID', async () => {
        // Arrange
        const mockReceta = { _id: '123', nombre: 'Recipe 1', ingredients: [{ ingredient: { nombre: 'Ingredient 1' } }] };
        Receta.findById.mockResolvedValue({ populate: jest.fn().mockResolvedValue(mockReceta) });
        const req = { params: { id: '123' } };
        const res = {
            json: jest.fn(),
        };

        // Act
        await getRecetaById(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(mockReceta);
    });

    it('should return 404 if recipe not found', async () => {
        // Arrange
        Receta.findById.mockResolvedValue({ populate: jest.fn().mockResolvedValue(null) });
        const req = { params: { id: '456' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Act
        await getRecetaById(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Receta not found' });
    });


    it('should return a 500 error if something goes wrong', async () => {
        // Arrange
        const errorMessage = 'Database error';
        Receta.findById.mockRejectedValue(new Error(errorMessage));
        const req = { params: { id: '123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Act
        await getRecetaById(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
