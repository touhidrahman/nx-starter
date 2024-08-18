import { Component } from '@angular/core'
import { MaterialModules } from '@myorg/material-modules'
import { ReactiveFormsModule } from '@angular/forms'
import { NestedTreeControl } from '@angular/cdk/tree'
import { MatTreeNestedDataSource } from '@angular/material/tree'

export interface InfoTreeNode {
    name: string
    children?: InfoTreeNode[]
}

@Component({
    selector: 'app-info-tree',
    standalone: true,
    imports: [...MaterialModules, ReactiveFormsModule],
    templateUrl: './info-tree.component.html',
    styleUrl: './info-tree.component.scss',
})
export class InfoTreeComponent {
    treeControl = new NestedTreeControl<InfoTreeNode>((node) => node.children)
    dataSource = new MatTreeNestedDataSource<InfoTreeNode>()

    hasChild = (_: number, node: InfoTreeNode) =>
        !!node.children && node.children.length > 0

    constructor() {
        this.dataSource.data = [
            {
                name: 'Requirements',
                children: [
                    { name: 'Requirement 1' },
                    { name: 'Requirement 2' },
                    { name: 'Requirement 3' },
                ],
            },
            {
                name: 'Test Protocols',
                children: [
                    {
                        name: 'Test Protocols 1',
                        children: [
                            { name: 'Test Protocols 1.1' },
                            { name: 'Test Protocols 1.2' },
                        ],
                    },
                    {
                        name: 'Test Protocols 2',
                        children: [
                            { name: 'Test Protocols 2.1' },
                            { name: 'Test Protocols 2.2' },
                        ],
                    },
                ],
            },
            {
                name: 'Execution Tests',
                children: [
                    {
                        name: 'Execution Test 1',
                        children: [
                            { name: 'Execution Test 1.1' },
                            { name: 'Execution Test 1.2' },
                        ],
                    },
                    {
                        name: 'Execution Test 2',
                        children: [
                            { name: 'Execution Test 2.1' },
                            { name: 'Execution Test 2.2' },
                        ],
                    },
                ],
            },
            {
                name: 'Deviations',
                children: [
                    {
                        name: 'Deviation 1',
                        children: [
                            { name: 'Deviation 1.1' },
                            { name: 'Deviation 1.2' },
                        ],
                    },
                    {
                        name: 'Deviation 2',
                        children: [
                            { name: 'Deviation 2.1' },
                            { name: 'Deviation 2.2' },
                        ],
                    },
                ],
            },
        ]
    }
}
