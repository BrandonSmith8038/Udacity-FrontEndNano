var viewModel = function() {
    var self = this;

    self.showTheMenu = ko.observable(false);
    

    self.showMenu = function() {
        self.showTheMenu(!self.showTheMenu());
    }


};

ko.applyBindings(new viewModel());