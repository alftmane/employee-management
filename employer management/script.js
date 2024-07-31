let employees = [];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
}

function showAddEmployeeForm() {
    document.getElementById('add-employee').style.display = 'block';
}

function hideAddEmployeeForm() {
    document.getElementById('add-employee').style.display = 'none';
}

function addEmployee() {
    const name = document.getElementById('new-employee-name').value;
    const role = document.getElementById('new-employee-role').value;
    const department = document.getElementById('new-employee-department').value;
    const location = document.getElementById('new-employee-location').value;

    if (name && role && department && location) {
        const employee = { name, role, department, location, status: 'Available' };
        employees.push(employee);
        toastr.success('تمت إضافة الموظف بنجاح');
        displayEmployees();
        hideAddEmployeeForm();
        updateFilters();
    } else {
        alert('يرجى ملء جميع الحقول');
    }
}

function displayEmployees() {
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';

    employees.forEach((employee, index) => {
        const employeeDiv = document.createElement('div');
        employeeDiv.className = 'employee';
        employeeDiv.innerHTML = `
            <div>
                <strong>${employee.name}</strong> - ${employee.role} (${employee.department}) - ${employee.location}
            </div>
            <div>
                <span>${employee.status}</span>
                <button onclick="updateStatus(${index})">تحديث الحالة</button>
                <button onclick="removeEmployee(${index})">حذف</button>
            </div>
        `;
        employeeList.appendChild(employeeDiv);
    });
}

function updateStatus(index) {
    const newStatus = prompt('أدخل الحالة الجديدة:', employees[index].status);
    if (newStatus) {
        employees[index].status = newStatus;
        toastr.info('تم تحديث الحالة');
        displayEmployees();
    }
}

function removeEmployee(index) {
    employees.splice(index, 1);
    toastr.warning('تم حذف الموظف');
    displayEmployees();
    updateFilters();
}

function searchEmployees() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredEmployees = employees.filter(employee => 
        employee.name.toLowerCase().includes(searchQuery) ||
        employee.role.toLowerCase().includes(searchQuery) ||
        employee.department.toLowerCase().includes(searchQuery) ||
        employee.location.toLowerCase().includes(searchQuery)
    );
    
    displayFilteredEmployees(filteredEmployees);
}

function displayFilteredEmployees(filteredEmployees) {
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';

    filteredEmployees.forEach((employee, index) => {
        const employeeDiv = document.createElement('div');
        employeeDiv.className = 'employee';
        employeeDiv.innerHTML = `
            <div>
                <strong>${employee.name}</strong> - ${employee.role} (${employee.department}) - ${employee.location}
            </div>
            <div>
                <span>${employee.status}</span>
                <button onclick="updateStatus(${index})">تحديث الحالة</button>
                <button onclick="removeEmployee(${index})">حذف</button>
            </div>
        `;
        employeeList.appendChild(employeeDiv);
    });
}

function filterEmployees() {
    const department = document.getElementById('filter-department').value.toLowerCase();
    const role = document.getElementById('filter-role').value.toLowerCase();
    const location = document.getElementById('filter-location').value.toLowerCase();

    const filteredEmployees = employees.filter(employee =>
        (department === '' || employee.department.toLowerCase() === department) &&
        (role === '' || employee.role.toLowerCase() === role) &&
        (location === '' || employee.location.toLowerCase() === location)
    );

    displayFilteredEmployees(filteredEmployees);
}

function updateFilters() {
    const departmentSelect = document.getElementById('filter-department');
    const roleSelect = document.getElementById('filter-role');
    const locationSelect = document.getElementById('filter-location');

    const departments = [...new Set(employees.map(emp => emp.department))];
    const roles = [...new Set(employees.map(emp => emp.role))];
    const locations = [...new Set(employees.map(emp => emp.location))];

    updateFilterOptions(departmentSelect, departments);
    updateFilterOptions(roleSelect, roles);
    updateFilterOptions(locationSelect, locations);
}

function updateFilterOptions(selectElement, options) {
    selectElement.innerHTML = '<option value="">الكل</option>';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.toLowerCase();
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}
