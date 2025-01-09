class Base {
    static _model = null;

    static get model() {
        if (!this._model) {
            throw new Error(
                `Model not set for ${this.name}. Use "Base.registerModel(model)" in the child class.`
            );
        }
        return this._model;
    }

    static setModel(model) {
        this._model = model;
    }

    async save(model) {
        const instance = new this.constructor.model(model);
        return await instance.save();
    }

    static async findById(id) {
        return await this.model.findById(id);
    }

    static async findAll() {
        return await this.model.find();
    }

    static async deleteAll() {
        return await this.model.deleteMany();
    }

    static async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }

    static async updateById(id, model) {
        return await this.model.findByIdAndUpdate(id, model);
    }
}

module.exports = Base;
